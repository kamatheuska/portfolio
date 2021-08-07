const mongoose = require('mongoose');
const { getConfig } = require('../config');
const exceptions = require('../constants/exceptions');
const { logInfo } = require('../services/logger');
const { transformErrorToException } = require('../utils/errors');

const db = mongoose.connection;

async function connectToMongoose() {
    const config = getConfig();

    try {
        await mongoose.connect(config.mongoDbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logInfo('Db.connectToMongoose', 'Connecting succesfully to', config.mongoDbUri);
    } catch (error) {
        throw transformErrorToException(error, { code: exceptions.MONGOOSE_ERROR });
    }

    db.on('error', (error) => {
        throw transformErrorToException(error, { code: exceptions.MONGOOSE_ERROR });
    });
}

exports.connectToMongoose = connectToMongoose;
