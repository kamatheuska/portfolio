import fs from 'fs';
import prettyBytes from 'pretty-bytes';
import { Buffer } from 'node:buffer';

async function fileAnalyse(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    reply.status(error.status).send({ error: error.message });
  });

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
