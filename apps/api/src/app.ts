import * as path from "node:path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import { fileURLToPath } from "node:url";
import cors from "./plugins/cors.js";
import db from "./plugins/db.js";
import env from "./plugins/env.js";
import helmet from "./plugins/helmet.js";
import multipart from "./plugins/multipart.js";
import sensible from "./plugins/sensible.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AppOptions = {
    // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
    const logger = fastify.log.child({ module: "app" });

    logger.info("Registering plugins...");

    fastify.register(env, opts);
    fastify.register(cors, opts);
    fastify.register(helmet, opts);
    fastify.register(multipart, opts);
    fastify.register(sensible);
    fastify.register(db, opts);

    logger.info("Registering routes...");

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, "routes"),
        options: opts,
        forceESM: true,
    });

    logger.info("App setup complete.");
};

export default app;
export { app, options };
