
import Env from '@fastify/env';
import S from 'fluent-json-schema';
import Sensible from '@fastify/sensible';
import Autoload from '@fastify/autoload';

import { join } from './utils/dir.js';
import quotesPlugin from './projects/apis/quotes/quotes.plugin.js';

export default async function createApp(fastify, opts) {
	const envOptions = {
		dotenv: true,
		schema: S.object()
			.prop('NODE_ENV', S.string().required())
			.valueOf(),
	};

	await fastify.register(Env, envOptions);
	await fastify.register(Sensible);

	await fastify.register(Autoload, {
		dir: join(import.meta.url, 'plugins'),
		options: { ...opts },
	});
	await fastify.register(quotesPlugin);
}
