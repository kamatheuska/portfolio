import { FastifyPluginAsync } from "fastify";
import { S } from "fluent-json-schema";
import { metaUsers } from "../../../db/schema.js";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { DrizzleQueryError } from "drizzle-orm";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const db = fastify.getDecorator<PostgresJsDatabase>("db");

    fastify.route({
        method: "POST",
        schema: {
            body: S.object().prop("username", S.string().required()).prop("password", S.string().required()),
            response: {
                204: S.null(),
            },
        },
        url: "/users",
        handler: async function createMetaUser(req, reply) {
            const { username, password } = req.body as { username: string; password: string };

            let created;
            try {
                const [user] = await db
                    .insert(metaUsers)
                    .values({
                        username,
                        password,
                    })
                    .returning();

                created = user;
            } catch (err) {
                req.log.error({ err });
                if (err instanceof DrizzleQueryError) {
                    throw fastify.httpErrors.badRequest();
                }
                throw fastify.httpErrors.internalServerError("Could not create user");
            }

            if (!created) {
                throw fastify.httpErrors.internalServerError("Could not create user");
            }

            return reply.code(204).send();
        },
    });
};

export default auth;
