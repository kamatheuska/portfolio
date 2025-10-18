import fp from "fastify-plugin";
import { envConfig, evaluateEnv } from "../server.js";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(
  async (fastify) => {
    try {
      const config = evaluateEnv(envConfig);
      fastify.log.info({ config }, "Environment variables loaded:");

      fastify.decorate("config", {
        getter() {
          return config;
        },
      });
      fastify.log.info("Envs plugin ready");
    } catch (error) {
      fastify.log.error({ err: error }, "Environment validation failed:");
      process.exit(1);
    }
  },
  {
    name: "env-plugin",
  }
);

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    env(): Map<string, string | undefined>;
  }
}
