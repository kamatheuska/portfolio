const dns = require('dns');
const util = require('util');
const mongoose = require('mongoose');
const Url = require('../model/url');
const {
    DocumentNotFoundException,
    RequestParamException,
    MongooseValidationException,
} = require('./exceptions');
const {
    isTypeOrThrow,
    isTruthyOrThrow,
    isEqualOrThrow,
    isTruthyOrThrowMessage,
} = require('../utils/errors');
const { errorCode } = require('../constants');

const dnsLookupPromisfied = util.promisify(dns.lookup);

async function checkHostnameValidity(hostname) {
    try {
        isTruthyOrThrow(hostname, RequestParamException);

        await dnsLookupPromisfied(hostname);
        return true;
    } catch (error) {
        isEqualOrThrow(error.code, errorCode.ENOTFOUND, {
            errorMessage: `${hostname} is an invalid url`,
            GivenException: RequestParamException,
        });

        throw error;
    }
}

async function buildNewShortUrl(hostname) {
    const count = await Url.countUrlDocuments();

    return Url.createUrl({ hostname, count });
}

async function saveUrl(url) {
    try {
        return await url.save();
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            throw new MongooseValidationException(error);
        }

        throw error;
    }
}

/**
 * @param {Object} doc - saved url mongoose document
 */
function createUrlObject({ short, original }) {
    const href = `/api/shorturl/${short}`;

    return {
        originalUrl: original,
        shortUrl: short,
        href,
    };
}

async function findUrlById(shortId) {
    const url = await Url.findOne({ short: shortId }).exec();

    isTruthyOrThrowMessage(url, {
        errorMessage: `No url document found with ${shortId}`,
        GivenException: DocumentNotFoundException,
    });

    return url;
}

async function getUrlById(shortId) {
    isTypeOrThrow(shortId);
    return findUrlById(shortId);
}

exports.buildNewShortUrl = buildNewShortUrl;
exports.checkHostnameValidity = checkHostnameValidity;
exports.createUrlObject = createUrlObject;
exports.getUrlById = getUrlById;
exports.saveUrl = saveUrl;

module.exports = {
    buildNewShortUrl,
    checkHostnameValidity,
    createUrlObject,
    getUrlById,
    saveUrl,
};
