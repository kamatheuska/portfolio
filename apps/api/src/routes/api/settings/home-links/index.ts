import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import type { FastifyInstance } from "fastify";
import { homeLinks } from "../../../../db/admin-schema.js";

async function homeLinksPlugin(fastify: FastifyInstance) {
    const adminDb = fastify.getDecorator<BetterSQLite3Database>("adminDb");

    fastify.route({
        method: "GET",
        url: "/",
        handler: async function getHomeLinks(req) {
            const links = await adminDb.select().from(homeLinks);

            req.log.info({ links }, "Fetched home links");

            if (!links) {
                throw fastify.httpErrors.notFound("No home links found");
            }

            return {
                records: links,
            };
        },
    });
}

export default homeLinksPlugin;
