import quotesPlugin from './quotes/quotes.plugin.js';

/**
 * @param {import('fastify').FastifyInstance} instance
 */
async function projectsContext(instance) {
	const contextOpts = {
		prefix: '/projects/apis',
	};

	instance.register(quotesPlugin, contextOpts);
}

export default projectsContext;
