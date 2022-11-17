
import Env from '@fastify/env';
import S from 'fluent-json-schema';
import Sensible from '@fastify/sensible';
import Autoload from '@fastify/autoload';

import { join } from './utils/dir.js';
import quotesPlugin from './projects/apis/quotes/quotes.plugin.js';
import timestampPlugin from './projects/apis/timestamp/timestamp.plugin.js';
import shortUrlPlugin from './projects/apis/shortUrl/shortUrl.plugin.js';

export default async function createApp(fastify, opts) {
	const envOptions = {
		dotenv: true,
		schema: S.object()
			.prop('NODE_ENV', S.string().required())
			.prop('MONGODB_URI', S.string().required())
			.prop('DB_DOCUMENT_LIMIT', S.number().required().default(100))
			.valueOf(),
	};

	await fastify.register(Env, envOptions);
	await fastify.register(Sensible);

	await fastify.register(Autoload, {
		dir: join(import.meta.url, 'plugins'),
		options: { ...opts },
	});

	await fastify.register(quotesPlugin);
	await fastify.register(timestampPlugin);
	await fastify.register(shortUrlPlugin);
}

export const options = {
	logger: {
		development: {
			transport: {
				target: 'pino-pretty',
			},
		},
		production: true,
		test: false,
	},
};
