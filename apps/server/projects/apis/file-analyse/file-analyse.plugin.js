import { Buffer } from 'node:buffer';
import prettyBytes from 'pretty-bytes';

async function fileAnalyse(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    reply.status(error.status).send({ error: error.message });
  });

  fastify.route({
    method: 'POST',
    path: '/projects/apis/fileanalyse',
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
