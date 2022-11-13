import fastify from 'fastify';
import fp from 'fastify-plugin';
import createApp from '../app.js';

export async function build(opts = {}) {
	const app = fastify();

	await app.register(fp(createApp), { testing: true, ...opts });

	return app;
}
