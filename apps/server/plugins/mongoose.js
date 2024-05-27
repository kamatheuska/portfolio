import mongoose from 'mongoose';
import fp from 'fastify-plugin';
import { model as shortUrlModel, modelAlias as shortUrlModelAlias } from '../projects/apis/shortUrl/shortUrl.model.js';

async function mongooseConnector(fastify) {
  const {
    log,
    config,
  } = fastify;

  const childLog = log.child({ context: 'db.mongooseConnector' });

  async function connectToDatabase() {
    const uri = config.MONGODB_URI;
    childLog.info('Start connection to MongoDB');

    await mongoose.connect(uri);

    childLog.info(`Connected succesfully to ${uri}`);
  }

  function closeConnection(app, done) {
    app.mongoose.instance.connection.on('close', () => {
      done();
    });
    app.mongoose.instance.connection.close();
  }

  const models = {
    [shortUrlModelAlias]: shortUrlModel,
  };

  fastify.addHook('onClose', closeConnection);
  fastify.decorate('mongoose', {
    instance: mongoose,
    models,
  });

  await connectToDatabase();
}

export default fp(mongooseConnector, {
  name: 'mongooseConnector',
});
