import S from 'fluent-json-schema';

const randomQuoteSchema = {
  description: 'Route to get data from request client',
  response: {
    200: S.object()
      .prop('ipaddress', S.string())
      .prop('language', S.string())
      .prop('software', S.string()),
  },
};

async function whoami(fastify) {
  fastify.route({
    method: 'GET',
    path: '/projects/apis/whoami',
    handler: getWhoAmI,
    schema: randomQuoteSchema,
  });

  async function getWhoAmI(req) {
    const whoami = {
      ipaddress: req.ip,
      language: req.headers['accept-language'],
      software: req.headers['user-agent'],
    };

    return whoami;
  }
}

export default whoami;
