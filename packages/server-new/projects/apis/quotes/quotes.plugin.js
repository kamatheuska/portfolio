import quotes from './quotes.data.js';
import QuotesService from './quotes.service.js';

async function quotesPlugin(fastify) {
	fastify.get('/quotes/random', request => {
		const {previous} = request.query;
		const service = new QuotesService(quotes);

		return service.getRandomAuthoredQuote(previous);
	});
}

export default quotesPlugin;
