import { Buffer } from "node:buffer";

import prettyBytes from "pretty-bytes";
import type { FastifyInstance } from "fastify";

export function getFccErrorHandler(fastify: FastifyInstance) {
    // @ts-expect-error not typed
    return (error, request, reply) => {
        fastify.log.error(error);
        reply.status(error.status || 500).send({ error: error.message });
    };
}

async function fileAnalyse(fastify: FastifyInstance) {
    fastify.setErrorHandler(getFccErrorHandler(fastify));

    fastify.route({
        method: "POST",
        url: "/",
        handler: async function analyse(req) {
            const data = await req.file();

            if (!data) {
                throw fastify.httpErrors.badRequest("No file uploaded");
            }

            const { filename, mimetype } = data;
            const buffer = await data.toBuffer();
            const size = Buffer.byteLength(buffer);

            return {
                name: filename,
                type: mimetype,
                size: prettyBytes(size),
            };
        },
    });
}

export default fileAnalyse;
