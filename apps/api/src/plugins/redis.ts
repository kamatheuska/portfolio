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

    const redisUrl = config.get("REDIS_URL");

    if (!redisUrl) throw new Error("Missing REDIS_URL on config");

    let redis;
    try {
        redis = new Redis(redisUrl);
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
}, metadata);
