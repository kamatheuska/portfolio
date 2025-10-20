/* eslint-disable camelcase */
import { S } from "fluent-json-schema";
import crypto from "crypto";
import util from "util";
import dns from "dns";
import { FastifyInstance } from "fastify";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { count, eq } from "drizzle-orm";
import { urls } from "../../../db/schema.js";

const PROTOCOL_REGEX = /^(?:f|ht)tps?:\/\//;
const hasHttpProtocol = (url: string) => PROTOCOL_REGEX.test(url);
const lookup = util.promisify(dns.lookup);

export function getFccErrorHandler(fastify: FastifyInstance) {
    // @ts-expect-error not typed
    return (error, request, reply) => {
        fastify.log.error(error);
        reply.status(error.status || 500).send({ error: error.message });
    };
}
export function addHttp(url: string) {
    return hasHttpProtocol(url) ? url : `http://${url}`;
}

export function getHostNameFromUrl(url = "") {
    return hasHttpProtocol(url) ? new URL(url).hostname : url;
}

export async function validateUrl(url: string) {
    const hostname = getHostNameFromUrl(url);

    if (!hostname) {
        throw new Error("invalid url");
    }

    await validateHostname(hostname);
}

export async function validateHostname(hostname = "") {
    try {
        await lookup(hostname);
    } catch (error) {
        if (error instanceof Error && "code" in error && error.code === "ENOTFOUND") {
            throw new Error("invalid url");
        }

        throw error;
    }
}

async function shortUrlPlugin(fastify: FastifyInstance) {
    const log = fastify.log.child({ context: "shorturl" });
    const db = fastify.getDecorator<PostgresJsDatabase>("db");

    fastify.setErrorHandler(getFccErrorHandler(fastify));

    fastify.route({
        method: "POST",
        url: "/",
        schema: {
            body: S.object().prop("url", S.string().maxLength(256).minLength(10).required()),
            response: {
                200: S.anyOf([
                    S.object()
                        .prop("original_url", S.string().required())
                        .prop("short_url", S.string().required()),
                    S.object().prop("error", S.string().required()),
                ]),
                400: S.object().prop("error", S.string().required()),
                302: S.object(),
            },
        },
        handler: async function createShortUrl(req) {
            const { url } = req.body as { url: string };

            log.debug(`Create url: ${url}`);

            const MAX_COUNT_URL_ITEMS = 100;
            let selectedCount;

            try {
                const [result] = await db.select({ count: count() }).from(urls);
                selectedCount = result.count;
            } catch (err) {
                req.log.error({ err });
                throw fastify.httpErrors.internalServerError("Error on url creation");
            }
            let short = "";
            let hex = "";
            try {
                await validateUrl(url);

                if (selectedCount === null || selectedCount === undefined) {
                    throw fastify.httpErrors.internalServerError("No Count for urls");
                }

                if (selectedCount > MAX_COUNT_URL_ITEMS) {
                    throw fastify.httpErrors.badRequest("Count of shorturls exceeded limit");
                }

                hex = crypto.randomBytes(3).toString("hex");
                short = `/short/${hex}`;
            } catch (err) {
                req.log.error({ err }, "Error while creating hex and short");
                throw fastify.httpErrors.internalServerError("Error on url creation");
            }

            try {
                await db.insert(urls).values({
                    short,
                    original: url,
                    hex,
                });
                return {
                    // properties for fcc challenge
                    original_url: url,
                    short_url: hex,
                };
            } catch (err) {
                req.log.error({ err }, "Error on insert");
                throw fastify.httpErrors.internalServerError("Error on url creation");
            }
        },
    });

    fastify.route({
        method: "GET",
        url: "/:shortUrl",
        handler: async function getShortUrl(req, reply) {
            const { shortUrl } = req.params as { shortUrl: string };
            log.debug(`Requested shortUrl: ${shortUrl}`);

            const [url] = await db.select().from(urls).where(eq(urls.hex, shortUrl));

            if (!url) {
                throw fastify.httpErrors.notFound("Url was not found");
            }

            log.debug(`Url found: ${url}`);
            log.info(`Redirecting to: ${url.original}`);

            return reply.redirect(url.original);
        },
    });
}

export default shortUrlPlugin;
