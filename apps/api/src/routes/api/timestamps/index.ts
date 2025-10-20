import { S } from "fluent-json-schema";
import { FastifyInstance } from "fastify";

const timestampResponseSchema = {
    200: S.object().prop("unix", S.number().required()).prop("utc", S.string().required()),
    400: S.object().prop("error", S.string().required()),
};
export function getFccErrorHandler(fastify: FastifyInstance) {
    // @ts-expect-error not typed
    return (error, request, reply) => {
        fastify.log.error(error);
        reply.status(error.status || 500).send({ error: error.message });
    };
}

async function timestampPlugin(fastify: FastifyInstance) {
    fastify.setErrorHandler(getFccErrorHandler(fastify));

    fastify.route({
        method: "GET",
        url: "/generate",
        schema: {
            response: timestampResponseSchema,
        },
        handler: async function getTimestamp() {
            return createTimestamp();
        },
    });

    fastify.route({
        method: "GET",
        url: "/generate/:date",
        schema: {
            response: timestampResponseSchema,
            params: S.object().prop("date", S.string().required()),
        },
        handler: async function generateTimestampForDate(request) {
            const { date } = request.params as { date: string };

            const parsed = Number(date);
            const _date = Number.isNaN(parsed) ? decodeURI(date) : parsed;

            if (!_date) {
                throw fastify.httpErrors.badRequest("Invalid Date");
            }

            const newDate = new Date(_date);

            return createTimestamp(newDate);
        },
    });

    function createTimestamp(date = new Date()) {
        const unix = date.getTime();

        if (!unix) {
            throw fastify.httpErrors.badRequest("Invalid Date");
        }

        return {
            unix,
            utc: date.toUTCString(),
        };
    }
}

export default timestampPlugin;
