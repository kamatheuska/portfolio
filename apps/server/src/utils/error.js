export function getFccErrorHandler(fastify) {
    return (error, request, reply) => {
        fastify.log.error(error);
        reply.status(error.status || 500).send({ error: error.message });
    };
}
