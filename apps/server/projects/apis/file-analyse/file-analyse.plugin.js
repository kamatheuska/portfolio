import FileAnalyseService from './file-analyse.service.js';

async function fileAnalyse(fastify) {
  fastify.route({
    method: 'POST',
    path: '/projects/apis/fileanalyse',
    handler: analyse,
    schema: {
      description: 'Route to create a short url from a provided url',
      response: analyse,
    },
  });

  async function analyse(req) {
    const data = await req.file();

    return FileAnalyseService.analyse(data);
  }
}

export default fileAnalyse;
