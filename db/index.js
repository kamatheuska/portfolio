const mongoose = require('mongoose');
const config = require('../config')
const db = mongoose.connection;

const connectToMongoose = async function () {

  try {
    await mongoose.connect(config.mongoDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
    });
    console.info('Connecting succesfully to %s', config.mongoDbUri)
  } catch (error) {
    console.error('Connection Error mongoose: ', error)
  }

  db.on('error', console.error.bind(console, 'connection error:'));
}
module.exports = { connectToMongoose }