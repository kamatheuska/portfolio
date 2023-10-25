/* eslint-disable camelcase */
import S from 'fluent-json-schema';
import crypto from 'crypto';

import { validateUrl } from '../../../utils/url.js';

const shortUrlSchema = {
  // 200: S.object()
  //   .prop('original_url', S.string().required())
  //   .prop('short_url', S.string().required()),
  400: S.object().prop('error', S.string().required()),
  302: S.object(),
};

async function shortUrlPlugin(fastify) {
  const { config } = fastify;
  const { ShortUrl } = fastify.mongoose.models;
  const log = fastify.log.child({ context: 'shorturl' });

  fastify.setErrorHandler((error, request, reply) => {
    reply.status(error.status).send({ error: error.message });
  });

  fastify.route({
    method: 'POST',
    path: '/projects/apis/shorturl/api/shorturl',
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
    path: '/projects/apis/shorturl/',
    async handler() {
      return { ok: true };
    },
    schema: {
      description:
        'Make FCC Challenge pass when requesting this URL from the redirect',
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
    const { url } = req.body;

    log.debug(`Create url: ${url}`);

    try {
      await validateUrl(url);
      await ShortUrl.checkDocumentCount(config.DB_DOCUMENT_LIMIT);

      const shortUrl = await buildUrl(url);

      return {
        // properties for fcc challenge
        original_url: shortUrl.original,
        short_url: shortUrl.hex,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async function getShortUrl(req, reply) {
    const { shortUrl } = req.params;
    log.debug(`Requested shortUrl: ${shortUrl}`);

    const url = await ShortUrl.findOne({ hex: shortUrl }).exec();

    if (!url) {
      throw new fastify.httpErrors.NotFound('Url was not found');
    }

    log.debug(`Url found: ${url}`);
    log.info(`Redirecting to: ${url.original}`);

    return reply.redirect(url.original);
  }

  async function buildUrl(url) {
    const hex = crypto.randomBytes(3).toString('hex');
    const short = `/short/${hex}`;

    const shortUrl = new ShortUrl({
      original: url,
      hex,
      short,
    });

    log.info(`New shortUrl: ${shortUrl}`);

    return shortUrl.save();
  }
}

export default shortUrlPlugin;
