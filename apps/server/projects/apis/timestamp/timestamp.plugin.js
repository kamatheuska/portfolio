import S from 'fluent-json-schema';

import TimestampService from './timestamp.service.js';

const timestampResponseSchema = {
  200: S.object()
    .prop('unix', S.number().required())
    .prop('utc', S.string().required()),
  400: S.object().prop('error', S.string().required()),
};

async function timestampPlugin(fastify) {
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
    return TimestampService.create();
  }

  async function getTimestampByDate(request) {
    const { date } = request.params;

    return TimestampService.parseAndCreate(date);
  }
}

export default timestampPlugin;
