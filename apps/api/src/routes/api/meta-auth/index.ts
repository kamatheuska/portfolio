import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";
import { S } from "fluent-json-schema";
import { metaSessions, metaUsers } from "../../../db/schema.js";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { DrizzleQueryError, eq } from "drizzle-orm";
import { Redis } from "ioredis";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

const AUTH_COOKIE_NAME = 'x-auth-token';

function parseCookies(request: FastifyRequest) {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function (cookie) {
        let [name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        // @ts-expect-error not typed
        list[name] = decodeURIComponent(value);
    });

    return list;
}

function decodeToken(req: FastifyRequest, fastify: FastifyInstance) {
    const cookie = parseCookies(req) as { [AUTH_COOKIE_NAME]: string };
    const token = cookie[AUTH_COOKIE_NAME];

    req.log.debug({ headers: req.headers, cookie }, 'headers and cookie')

    if (!token) {
        req.log.debug('No token on cookies')
        throw fastify.httpErrors.unauthorized
    }
    const secret = getEnv(fastify, "JWT_SECRET");

    let decoded;
    try {
        req.log.debug("Token from request %s", token);
        const _decoded = jwt.verify(token, secret);

        decoded = _decoded;
    } catch (err) {
        req.log.warn({ err }, "Error while jwt verify");
        throw fastify.httpErrors.unauthorized();
    }

    let user = { username: "", userId: "" };

    if (typeof decoded !== "string" && "username" in decoded && "userId" in decoded) {
        user.username = decoded.username;
        user.userId = decoded.userId;
    } else {
        throw fastify.httpErrors.unauthorized();
    }

    return {
        token,
        decoded,
        user,
    };
}

async function queryWithError<R = any>(query: Promise<R>, fastify: FastifyInstance, req: FastifyRequest) {
    let result;
    try {
        result = await query;
    } catch (err) {
        req.log.error({ err }, "Error while query DB");
        if (err instanceof DrizzleQueryError) {
            throw fastify.httpErrors.badRequest();
        }

        throw fastify.httpErrors.internalServerError();
    }

    if (!result) {
        throw fastify.httpErrors.internalServerError("No returning from Query");
    }

    return result;
}

function getEnv(fastify: FastifyInstance, env: string) {
    const config = fastify.getDecorator<Map<string, string | undefined>>("config");

    const secret = config.get(env);

    if (!secret) {
        throw fastify.httpErrors.internalServerError("No env for " + env);
    }

    return secret;
}

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const db = fastify.getDecorator<PostgresJsDatabase>("db");

    const usernameSchema = S.string().required();
    const passwordSchema = S.string().required();

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

            const hash = crypto.createHash("sha256").update(password).digest("hex");

            const query = db
                .insert(metaUsers)
                .values({
                    username,
                    password: hash,
                })
                .returning();

            await queryWithError(query, fastify, req);

            return reply.code(204).send();
        },
    });

    fastify.route({
        method: "POST",
        url: "/sessions",
        schema: {
            body: S.object().prop("username", usernameSchema).prop("password", passwordSchema),
            response: {
                204: S.null(),
            },
        },
        handler: async function createSession(req, reply) {
            const { username, password } = req.body as { username: string; password: string };

            const query = db
                .select({
                    userId: metaUsers.userId,
                    password: metaUsers.password,
                })
                .from(metaUsers)
                .where(eq(metaUsers.username, username))
                .limit(1);

            const [user] = await queryWithError<
                {
                    userId: string;
                    password: string;
                }[]
            >(query, fastify, req);

            const hash = crypto.createHash("sha256").update(password).digest("hex");

            // TODO: replace password by hashed password
            if (hash !== user.password) {
                req.log.debug('Hash is not equal to saved password hash');
                throw fastify.httpErrors.unauthorized();
            }

            req.log.debug('Password hash matches!')

            const secret = getEnv(fastify, "JWT_SECRET");

            const token = jwt.sign(
                JSON.stringify({
                    username,
                    userId: user.userId,
                }),
                secret,
            );

            const redis = fastify.getDecorator<Redis>("redis");

            await redis.set("token_user_id:" + username, token);

            const insertQuery = db
                .insert(metaSessions)
                .values({
                    token,
                    userId: user.userId,
                })
                .returning();

            req.log.debug('Insert of session succesful!')

            const [session] = await queryWithError<
                {
                    token: string;
                    userId: string;
                }[]
            >(insertQuery, fastify, req);

            const cookie = "x-auth-token=" + session.token + ";" + "httpOnly=true";

            reply.header("set-cookie", cookie);

            return reply.code(204).send();
        },
    });

    fastify.route({
        method: "GET",
        url: "/sessions",
        schema: {
            response: {
                204: S.null(),
            },
        },
        handler: async function getMetaUserSession(req, reply) {
            const { token } = decodeToken(req, fastify);

            if (!token) {
                throw fastify.httpErrors.unauthorized();
            }

            let session: { token: string; userId: string };
            try {
                const [_session] = await db
                    .select({
                        token: metaSessions.token,
                        userId: metaSessions.userId,
                    })
                    .from(metaSessions)
                    .where(eq(metaSessions.token, token));

                session = _session;
            } catch (err) {
                req.log.error({ err }, "Error while fetching the user");
                if (err instanceof DrizzleQueryError) {
                    throw fastify.httpErrors.badRequest();
                }

                throw fastify.httpErrors.internalServerError();
            }

            if (!session?.token) {
                throw fastify.httpErrors.unauthorized();
            }

            return {
                ok: true,
            };
        },
    });

    fastify.route({
        method: "DELETE",
        url: "/sessions",
        schema: {
            response: {
                204: S.null(),
            },
        },
        handler: async function deleteSession(req, reply) {
            const { token } = decodeToken(req, fastify);
            const query = db.delete(metaSessions).where(eq(metaSessions.token, token)).returning();

            await queryWithError(query, fastify, req);

            const cookie = "x-auth-token=;expires=" + new Date(new Date().getTime()).toUTCString();

            reply.header("set-cookie", cookie);

            return reply.code(204).send();
        },
    });
};

export default auth;
