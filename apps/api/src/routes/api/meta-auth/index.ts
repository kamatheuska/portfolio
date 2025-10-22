import { FastifyPluginAsync } from "fastify";
import { S } from "fluent-json-schema";
import { metaUsers } from "../../../db/schema.js";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { DrizzleQueryError } from "drizzle-orm";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const db = fastify.getDecorator<PostgresJsDatabase>("db");

    const usernameSchema = S.string().required()
    const passwordSchema = S.string().required()

    fastify.route({
        method: "POST",
        schema: {
            body: S.object().prop("username", usernameSchema).prop("password", passwordSchema),
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

    fastify.route({
        method: 'POST',
        url: 'sessions',
        schema: {
            body: S.object().prop("username", usernameSchema).prop("password", passwordSchema),
            response: {
                204: S.null()
            }
        },
        handler: async function createSession(req, reply) {
    
            return reply.code(204).send()
        }
    })

    fastify.route({
        method: 'GET',
        url: 'sessions',
        schema: {
            response: {
                204: S.null()
            }
        },
        handler: async function getMetaUserSession() {

        }
    })
};

export default auth;
