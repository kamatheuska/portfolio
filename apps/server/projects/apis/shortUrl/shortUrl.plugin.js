import S from 'fluent-json-schema';
import ShortUrlService from './shortUrl.service.js';

const shortUrlSchema = {
  200: S.object()
    .prop('original', S.string().required())
    .prop('short', S.string().required()),
  400: S.object().prop('error', S.string().required()),
  302: S.object(),
};

async function shortUrlPlugin(fastify) {
  const { log, config } = fastify;
  const { ShortUrl } = fastify.mongoose.models;

  const getServiceOpts = () => ({
    documentLimit: config.DB_DOCUMENT_LIMIT,
  });

  fastify.route({
    method: 'POST',
    path: '/projects/apis/shorturl',
    handler: createShortUrl,
    schema: {
      description: 'Route to create a short url from a provided url',
      response: shortUrlSchema,
    },
  });

  fastify.route({
    method: 'GET',
    path: '/short/:shortUrl',
    handler: getShortUrl,
    schema: {
      description: 'Route to get a short url from a provided url',
      response: shortUrlSchema,
    },
  });

  fastify.route({
    method: 'GET',
    path: '/projects/apis/shorturl/api/shorturl/:shortUrl',
    handler: getShortUrl,
    schema: {
      description:
        'Route to get a short url from a provided url, specific for freecodecamp',
      response: shortUrlSchema,
    },
  });

  async function createShortUrl(req) {
    const service = new ShortUrlService({ ShortUrl }, log, getServiceOpts());

    const { url } = req.body;

    const shortUrl = await service.create(url);

    return shortUrl;
  }

  async function getShortUrl(req, reply) {
    const service = new ShortUrlService({ ShortUrl }, log, getServiceOpts());
    const { shortUrl } = req.params;

    const url = await service.get(shortUrl);

    log.info(`Redirecting to: ${url.original}`);

    return reply.redirect(url.original);
  }
}

export default shortUrlPlugin;
