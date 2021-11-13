const dns = require('dns');
const util = require('util');
const _ = require('lodash');
const Url = require('../model/url');
const { DocumentNotFoundException, RequestParamException } = require('./exceptions');
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
        isEqualOrThrow(error.code, errorCode.ENOTFOUND);

        throw new RequestParamException(`${hostname} is an invalid url`);
    }
}

/**
 * builds a new short url and returns a new Url object
 *
 * @param {String} hostname
 * @param {Number} count
 *
 * @returns {UrlModel} Url
 */
async function buildNewShortUrl(hostname) {
    const count = await Url.countUrlDocuments();
    Url.checkDatabaseUrlCount(count);

    return Url.createUrlDoc(hostname, count);
}

async function saveUrl(url) {
    return url.save();
}

/**
 * @param {Object} doc - saved url mongoose document
 */
function createUrlObject({ short, original }, rawOriginalUrl) {
    isTruthyOrThrowMessage(_.isString(short) && _.isString(original), {
        errorMessage: 'createUrlObject: short and original must be strings',
    });

    const href = `/api/shorturl/${short}`;

    return {
        originalUrl: rawOriginalUrl,
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
