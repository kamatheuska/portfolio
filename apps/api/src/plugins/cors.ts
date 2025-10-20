import fastifyCors from "@fastify/cors";
import fp from "fastify-plugin";

const metadata: fp.PluginMetadata = {
    name: "cors-plugin",
};
/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async fastify => {
    fastify.log.info("Registering plugin %s", metadata.name);
    fastify.register(fastifyCors, {
        origin: (origin, cb) => {
            if (!origin) {
                cb(null, true);
                return;
            }
            const hostname = new URL(origin).hostname;
            if (hostname === "localhost") {
                //  Request from localhost will pass
                cb(null, true);
                return;
            }
            const whitelisted = ["nicolasramirez.dev", "127.0.0.1"];
            console.log("hs", hostname);
            if (whitelisted.includes(hostname)) {
                cb(null, true);
                return;
            }
            // Generate an error on other origins, disabling access
            cb(new Error("Not allowed"), false);
        },
    });
}, metadata);
