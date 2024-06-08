import fp from 'fastify-plugin';
import Random from '../utils/random.js';

async function random(fastify) {
    fastify.decorate('Random', Random);
}

export default fp(random, {
    name: 'random',
});
