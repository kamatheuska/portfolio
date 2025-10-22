import fastify from "fastify";
import closeWithGrace from "close-with-grace";
import appService from "./app.js";
import { evaluateEnv } from "./utils/env.js";
import type { EnvVarConfig } from "./utils/env.js";

const app = fastify({
    logger: {
        transport: {
            target: "pino-pretty",
        },
        level: process.env.LOG_LEVEL ?? "info",
    },
});

app.register(appService);

closeWithGrace(
    { delay: Number(process.env.FASTIFY_CLOSE_GRACE_DELAY) ?? 500 },
    async function ({ signal, err, manual }) {
        if (err) {
            app.log.error({ err, signal, manual }, "closing with grace due to error");
        }
        app.log.info({ signal, manual }, "closing with grace");
        await app.close();
    },
);

// Example usage:
export const envConfig: Map<string, EnvVarConfig> = new Map([
    ["DATABASE_URL", { required: true }],
    ["REDIS_HOST", { required: true }],
    ["REDIS_PASSWORD", { required: true }],
    ["REDIS_USERNAME", { required: true }],
    ["JWT_SECRET", { required: true }],
    ["PORT", { default: "3000" }],
    ["NODE_ENV", { default: "development" }],
    ["LOG_LEVEL", { default: "info" }],
    ["OPTIONAL_FEATURE", {}], // Optional, no default
]);

let env: Map<string, string | undefined>;

try {
    env = evaluateEnv(envConfig);
    app.log.debug("Environment variables loaded:");
} catch (error) {
    app.log.error({ err: error }, "Environment validation failed:");
    process.exit(1);
}
// Access values with type safety
const port = Number(env.get("PORT"));
const host = process.env.NODE_ENV === "development" ? "localhost" : (process.env.HOST ?? "0.0.0.0");

app.log.info(`Starting server on ${host}:${port} in ${env.get("NODE_ENV")} mode`);
app.listen({ port, host }, err => {
    if (err) {
        app.log.fatal({ err }, "Error starting server:");
        process.exit(1);
    }
});

export { evaluateEnv, EnvVarConfig };
