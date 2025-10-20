import fastifyHelmet from "@fastify/helmet";
import fp from "fastify-plugin";

const metadata: fp.PluginMetadata = {
    name: "helmet",
};

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async fastify => {
    fastify.log.info("Registering plugin %s", metadata.name);
    fastify.register(fastifyHelmet);
}, metadata);
