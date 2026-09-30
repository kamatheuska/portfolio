import fp from "fastify-plugin";
import { envConfig, evaluateEnv } from "../server.js";

const metadata: fp.PluginMetadata = {
    name: "env-plugin",
};

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
        throw error;
    }
}, metadata);
