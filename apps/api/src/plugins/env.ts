import fp from "fastify-plugin";
import { envConfig, evaluateEnv } from "../server.js";

const metadata: fp.PluginMetadata = {
    name: "env-plugin",
};

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async fastify => {
    try {
        fastify.log.info("Registering plugin %s", metadata.name);
        const config = evaluateEnv(envConfig);

        fastify.decorate("config", {
            getter() {
                return config;
            },
        });
    } catch (error) {
        fastify.log.error({ err: error }, "Environment validation failed:");
        process.exit(1);
    }
}, metadata);
