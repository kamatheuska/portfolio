import S from 'fluent-json-schema';
import { getFccErrorHandler } from '../../../utils/error.js';

const timestampResponseSchema = {
  200: S.object()
    .prop('unix', S.number().required())
    .prop('utc', S.string().required()),
  400: S.object().prop('error', S.string().required()),
};

async function timestampPlugin(fastify) {
  fastify.setErrorHandler(getFccErrorHandler(fastify));

  fastify.route({
    method: 'GET',
    path: '/projects/apis/timestamp/api',
    handler: getTimestamp,
    schema: {
      description: 'Route to get a generated timestamp',
      response: timestampResponseSchema,
    },
  });

  fastify.route({
    method: 'GET',
    path: '/projects/apis/timestamp/api/:date',
    handler: getTimestampByDate,
    schema: {
      description: 'Route to get a timestamp corresponding to the passed date',
      response: timestampResponseSchema,
    },
  });

  async function getTimestamp() {
    return createTimestamp();
  }

  async function getTimestampByDate(request) {
    const { date } = request.params;

    const parsedDate = parseDate(date);
    const newDate = new Date(parsedDate);

    return createTimestamp(newDate);
  }

  function createTimestamp(date = new Date()) {
    const unix = date.getTime();

    if (!unix) {
      throw fastify.httpErrors.badRequest('Invalid Date');
    }

    return {
      unix,
      utc: date.toUTCString(),
    };
  }

  function parseDate(dateString) {
    const parsed = Number(dateString);
    const date = Number.isNaN(parsed) ? decodeURI(dateString) : parsed;

    if (!date) {
      throw fastify.httpErrors.badRequest('Invalid Date');
    }

    return date;
  }
}

export default timestampPlugin;
