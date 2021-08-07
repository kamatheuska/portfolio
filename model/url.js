const mongoose = require('mongoose');
const { getConfig } = require('../config');
const { addHttp } = require('../utils/url');

const { MongooseValidationException } = require('../services/exceptions');
const { isEqualOrThrow } = require('../utils/errors');

const urlSchema = new mongoose.Schema({
    original: {
        type: String,
        max: 500,
        required: true,
    },
    short: {
        type: String,
        required: true,
    },
});

function savePreSchemaHook() {
    this.original = addHttp(this.original);
}

function checkDatabaseUrlCount(count) {
    isEqualOrThrow(count, getConfig().db.url.documentLimit, {
        errorMessage: 'Database capacity limit reached. Please Contact the administrator.',
        GivenExceptionv: MongooseValidationException,
    });
}

async function countUrlDocuments() {
    try {
        const count = await this.estimatedDocumentCount().exec();
        checkDatabaseUrlCount(count);

        return count;
    } catch (error) {
        throw new MongooseValidationException(error);
    }
}

async function createUrl(hostname, count) {
    try {
        return new Url({
            original: hostname,
            short: count + 1,
        });
    } catch (error) {
        throw new MongooseValidationException(error);
    }
}

urlSchema.pre('save', savePreSchemaHook);
urlSchema.statics.countUrlDocuments = countUrlDocuments;
urlSchema.statics.createUrl = createUrl;

const Url = mongoose.model('Url', urlSchema);

exports.savePreSchemaHook = savePreSchemaHook;
exports.countUrlDocuments = countUrlDocuments;
exports.checkDatabaseUrlCount = checkDatabaseUrlCount;
exports.createUrl = createUrl;

module.exports = Url;
