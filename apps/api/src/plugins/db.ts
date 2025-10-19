import fp from "fastify-plugin";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import closeWithGrace from "close-with-grace";
import { type Sql } from "postgres";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(
    async fastify => {
        // @ts-expect-error not typed
        const config = fastify.config as unknown as Map<string, string | undefined>;

        const dbUrl = config.get("DATABASE_URL");

        fastify.log.info("Init db plugin");

        if (!dbUrl) {
            throw new Error("DATABASE_URL is not defined in environment variables");
        }

        let db: PostgresJsDatabase & {
            $client: Sql;
        };
        fastify.log.info("Connecting to DB");
        try {
            db = drizzle(dbUrl);

            fastify.log.info("Test DB connection");
            await db.execute("SELECT 1 + 1");

            fastify.log.info("DB Connection stablished");
            fastify.decorate("db", db);

            closeWithGrace(
                { delay: Number(process.env.FASTIFY_CLOSE_GRACE_DELAY) ?? 500 },
                async function ({ signal, err, manual }) {
                    if (err) {
                        fastify.log.error(
                            { err, signal, manual },
                            "closing db plugin with grace due to error",
                        );
                    }
                    fastify.log.info({ signal, manual }, "closing db plugin with grace");
                    await db.$client.end();
                },
            );
        } catch (error) {
            fastify.log.error({ err: error }, "Error on connecting to the database:");
            process.exit(1);
        }
    },
    {
        name: "database-plugin",
        dependencies: ["env-plugin"],
    },
);

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
    export interface FastifyInstance {
        env(): Map<string, string | undefined>;
    }
}
