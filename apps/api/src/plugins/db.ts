import fp from "fastify-plugin";
import { drizzle } from "drizzle-orm/better-sqlite3";
import closeWithGrace from "close-with-grace";

const metadata: fp.PluginMetadata = {
    name: "db-plugin",
    dependencies: ["env-plugin"],
};

export default fp(async fastify => {
    const logger = fastify.log.child({ plugin: metadata.name });

    logger.info("Registering plugin %s", metadata.name);
    // @ts-expect-error not typed
    const config = fastify.config as unknown as Map<string, string | undefined>;

    const dbFileName = config.get("DB_FILE_NAME");
    const dbAdminFileName = config.get("DB_ADMIN_FILE_NAME");

    if (!dbFileName) {
        throw new Error("DB_FILE_NAME is not defined in the environment");
    }

    if (!dbAdminFileName) {
        throw new Error("DB_ADMIN_FILE_NAME is not defined in the environment");
    }

    logger.debug("Connecting to DB");

    let db;
    let adminDb;

    try {
        db = drizzle(dbFileName);
        adminDb = drizzle(dbAdminFileName);
    } catch (error) {
        logger.error({ err: error }, "Error while connecting to the database");
        throw error;
    }

    closeWithGrace(
        { delay: Number(process.env.FASTIFY_CLOSE_GRACE_DELAY) ?? 500 },
        async function ({ signal, err, manual }) {
            if (err) {
                logger.error({ err, signal, manual }, "closing db plugin with grace due to error");
            }
            logger.info({ signal, manual }, "closing db plugin with grace");
            db.$client.close();
            adminDb.$client.close();
        },
    );

    try {
        db.all("select 1");

        logger.debug("App Database Connection established");
        fastify.decorate("db", db);

        adminDb.all("select 1");

        logger.debug("Admin Database Connection established");
        fastify.decorate("adminDb", adminDb);
    } catch (error) {
        logger.error({ err: error }, "Error while connecting to the database");
        throw error;
    }
}, metadata);

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
    export interface FastifyInstance {
        env(): Map<string, string | undefined>;
    }
}
