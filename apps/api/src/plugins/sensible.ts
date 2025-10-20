import fp from "fastify-plugin";
import sensible, { FastifySensibleOptions } from "@fastify/sensible";

const metadata: fp.PluginMetadata = {
    name: "sensible-plugin",
};

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<FastifySensibleOptions>(async fastify => {
    fastify.log.info("Registering plugin %s", metadata.name);
    fastify.register(sensible);
}, metadata);
