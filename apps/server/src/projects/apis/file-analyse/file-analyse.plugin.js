import fs from 'node:fs';
import { Buffer } from 'node:buffer';

import prettyBytes from 'pretty-bytes';

import { getFccErrorHandler } from '../../../utils/error.js';

async function fileAnalyse(fastify) {
    fastify.setErrorHandler(getFccErrorHandler(fastify));

    fastify.get('/projects/apis/fileanalyse', (req, reply) => {
        const path = fastify.join(import.meta.url, 'index.html');
        const stream = fs.createReadStream(path);
        reply.type('text/html').send(stream);
    });

    fastify.route({
        method: 'POST',
        path: '/projects/apis/fileanalyse/api/fileanalyse',
        handler: analyse,
        schema: {
            description: 'Route to create a short url from a provided url',
            response: analyse,
        },
    });

    async function analyse(req) {
        const data = await req.file();

        if (!data) {
            throw fastify.httpErrors.badRequest('No file uploaded');
        }

        const { filename, mimetype } = data;
        const buffer = await data.toBuffer();
        const size = Buffer.byteLength(buffer);

        return {
            name: filename,
            type: mimetype,
            size: prettyBytes(size),
        };
    }
}

export default fileAnalyse;
