import { FastifyPluginAsync } from "fastify";
import { S } from "fluent-json-schema";
import { metaUsers } from "../../../db/schema.js";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { DrizzleQueryError, eq } from "drizzle-orm";
import { Redis } from "ioredis"
import  jwt from 'jsonwebtoken'

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
        url: '/sessions',
        schema: {
            body: S.object().prop("username", usernameSchema).prop("password", passwordSchema),
            response: {
                204: S.null()
            }
        },
        handler: async function createSession(req, reply) {
            const {username, password} = req.body as { username: string, password: string }
            // verify username and password
            let user: { userId: string, password: string }
            try {

                const [_user] = await db.select({
                    userId: metaUsers.userId,
                    password: metaUsers.password
                })
                    .from(metaUsers)
                    .where(eq(metaUsers.username, username))
                    .limit(1)
                user = _user
            } catch (err) { req.log.error({ err }, 'Error while fetching the user')
                if (err instanceof DrizzleQueryError) {
                    throw fastify.httpErrors.badRequest()
                }

                throw fastify.httpErrors.internalServerError()
            }

            // TODO: replace password by hashed password
            if (password !== user.password) {
                throw fastify.httpErrors.unauthorized()
            }

            const config = fastify.getDecorator<Map<string, string | undefined>>("config");

            const secret = config.get('JWT_SECRET')

            if (!secret) {
                throw fastify.httpErrors.internalServerError('No secret configured')
            }

            // create token for user
            // TODO: use jsonwebtoken
            const token = jwt.sign(JSON.stringify({
                username,
                userId: user.userId
            }), secret)
            
            const redis = fastify.getDecorator<Redis>("redis");

            await redis.set('token_user_id', token)

            const cookie = 'token='
                + token
                + ';'
                + 'httpOnly=true'

            reply.header('set-cookie', cookie)
            // save token on redis
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
