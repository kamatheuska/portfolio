const mongoose = require('mongoose');
const config = require('../config')
const db = mongoose.connection;

const connectToMongoose = function () {
  mongoose.connect(config.mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  });
  db.on('error', console.error.bind(console, 'connection error:'));
}
module.exports = { connectToMongoose }