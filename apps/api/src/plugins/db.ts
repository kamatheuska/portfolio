import fp from "fastify-plugin";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";
import { sql } from "drizzle-orm";
import closeWithGrace from "close-with-grace";

const metadata: fp.PluginMetadata = {
    name: "db-plugin",
    dependencies: ["env-plugin"],
};

export default fp(async fastify => {
    fastify.log.info("Registering plugin %s", metadata.name);
    // @ts-expect-error not typed
    const config = fastify.config as unknown as Map<string, string | undefined>;

    const dbUrl = config.get("DATABASE_URL");

    if (!dbUrl) {
        throw new Error("DATABASE_URL is not defined in environment variables");
    }

    let db: BetterSQLite3Database & {
        $client: DatabaseType;
    };
    fastify.log.debug("Connecting to DB");
    try {
        const sqlite = new Database(dbUrl);
        db = drizzle(sqlite);

        db.run(sql`SELECT 1`);

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
        process.exit(1);
    }
}, metadata);

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
    export interface FastifyInstance {
        env(): Map<string, string | undefined>;
    }
}
