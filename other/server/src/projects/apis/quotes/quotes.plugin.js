import S from 'fluent-json-schema';

import quotesList from './quotes.data.js';

const randomQuoteSchema = {
    description: 'Route to get a random quote',
    response: {
        200: S.object()
            .prop('id', S.string())
            .prop('text', S.string())
            .prop('author', S.string()),
    },
};

async function quotesPlugin(fastify) {
    const { Random } = fastify;

    fastify.route({
        method: 'GET',
        path: '/projects/apis/quotes/random',
        handler: onRandomQuote,
        schema: randomQuoteSchema,
    });

    async function onRandomQuote(request) {
        const { previous } = request.query;

        return getRandomAuthoredQuote(previous);
    }

    function getRandomAuthoredQuote(previous = null) {
        const quotes = quotesList.authored;
        const integer = Random.nonConsecutiveInteger(
            0,
            quotes.length,
            Number(previous),
        );

        return quotes[integer];
    }
}

export default quotesPlugin;
