async function health(fastify) {
    fastify.get('/health', (req, reply) => {
        return {
            uptime: process.uptime(),
            response: process.hrtime(),
            message: 'OK',
            timestamp: Date.now(),
        };
    });
}

export default health;
