import fastifyAutoload from "@fastify/autoload";
import closeWithGrace from "close-with-grace";
import fp from "fastify-plugin";
import { Redis } from "ioredis";

const metadata: fp.PluginMetadata = {
    name: "redis-plugin",
    dependencies: ["env-plugin"],
};

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async fastify => {
    fastify.log.info("Registering plugin %s", metadata.name);

    // @ts-expect-error not typed
    const config = fastify.config as unknown as Map<string, string | undefined>;

    const redisHost = config.get("REDIS_HOST");
    const redisPassword = config.get("REDIS_PASSWORD");
    const redisUsername = config.get("REDIS_USERNAME");

    let redis;
    try {
        redis = new Redis({
            host: redisHost,
            username: redisUsername,
            password: redisPassword,
            port: 6379,
        });
    } catch (err) {
        fastify.log.error({ err }, "Error while connecting to redis:");
    }

    if (!redis) throw new Error("No redis");
    try {
        fastify.log.debug("Testing connection to redis...");

        const dbSize = await redis.dbsize();

        fastify.log.debug("Redis DB_SIZE %s", dbSize);
    } catch (err) {
        fastify.log.error({ err }, "Error on testing redis connection");
        throw err;
    }

    closeWithGrace(
        { delay: Number(process.env.FASTIFY_CLOSE_GRACE_DELAY) ?? 500 },
        async function ({ signal, err, manual }) {
            if (err) {
                fastify.log.error({ err, signal, manual }, "closing redis with grace due to error");
            }
            fastify.log.info({ signal, manual }, "closing redis with grace");
            await redis.disconnect();
        },
    );

    redis.on("err", err => {
        if (err instanceof Error) {
            fastify.log.error({ err }, "Error on redis:");
        }
    });

    fastify.decorate("redis", {
        getter() {
            return redis;
        },
    });
}, metadata);
