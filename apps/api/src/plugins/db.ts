import fp from "fastify-plugin";
import { drizzle } from "drizzle-orm/better-sqlite3";
import closeWithGrace from "close-with-grace";

const metadata: fp.PluginMetadata = {
    name: "db-plugin",
    dependencies: ["env-plugin"],
};

export default fp(async fastify => {
    fastify.log.info("Registering plugin %s", metadata.name);
    // @ts-expect-error not typed
    const config = fastify.config as unknown as Map<string, string | undefined>;

    const dbFileName = config.get("DB_FILE_NAME");
    const dbAdminFileName = config.get("DB_ADMIN_FILE_NAME");

    fastify.log.debug("Connecting to DB");

    try {
        const db = drizzle(dbFileName);
        const adminDb = drizzle(dbAdminFileName);

        db.all("select 1");

        fastify.log.debug("DB Connection established");
        fastify.decorate("db", db);

        closeWithGrace(
            { delay: Number(process.env.FASTIFY_CLOSE_GRACE_DELAY) ?? 500 },
            async function ({ signal, err, manual }) {
                if (err) {
                    fastify.log.error({ err, signal, manual }, "closing db plugin with grace due to error");
                }
                fastify.log.info({ signal, manual }, "closing db plugin with grace");
                db.$client.close();
            },
        );
    } catch (error) {
        fastify.log.error({ err: error }, "Error on connecting to the database:");
        throw error;
    }
}, metadata);

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
    export interface FastifyInstance {
        env(): Map<string, string | undefined>;
    }
}
