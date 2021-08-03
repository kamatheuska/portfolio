const dns = require('dns');
const util = require('util');

const dnsLookupPromisfied = util.promisify(dns.lookup);
const mongoose = require('mongoose');
const Url = require('../model/url');
const { logRequestInfo, logInfo } = require('./logger');
const {
    DocumentNotFoundException,
    RequestParamException,
    MongooseValidationException,
} = require('./exceptions');
const { isTypeOrThrowException } = require('../utils');
const { getFullUrlFromRequest } = require('../utils/url');

async function checkHostnameValidity(hostname) {
    try {
        if (!hostname) {
            throw new RequestParamException('hostname is falsy or undefined');
        }

        await dnsLookupPromisfied(hostname);
        logInfo(
            'UrlShortenerService.checkHostnameValidity',
            `Hostname ${hostname} validated succesfully`,
        );
    } catch (error) {
        if (error.code === 'ENOTFOUND') {
            throw new RequestParamException(`${hostname} is an invalid url`);
        }
        throw error;
    }
}

async function buildNewShortUrl(hostname) {
    const count = await Url.estimatedDocumentCount().exec();
    if (count > 100) {
        next(new Error('Database capacity limit reached. Please Contact the administrator.'));
    }

    const newUrl = new Url({
        original: hostname,
        short: count + 1,
    });

    logInfo('UrlShortenerService.buildNewUrl', 'Saved Url in db', { hostname, newUrl });
    return newUrl;
}

async function saveUrl(url) {
    try {
        const doc = await url.save();

        logInfo('UrlShortenerService.buildNewUrl', 'Saved doc:', doc);

        return doc;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            throw new MongooseValidationException(error);
        }

        throw error;
    }
}

/**
 * @param {Object} doc - saved url mongoose document
 *
 * @param {Object} request - express request Object
 */
function createUrlObject(doc, request) {
    const href = `/api/shorturl/${doc.short}`;

    return {
        originalUrl: doc.original,
        shortUrl: doc.short,
        href,
    };
}

async function getUrl(shortId) {
    isTypeOrThrowException(shortId);
    return await findUrlById(shortId);
}

async function findUrlById(shortId) {
    const url = await Url.findOne({ short: shortId }).exec();

    if (!url) {
        throw new DocumentNotFoundException(`No url document found with ${shortId}`);
    }

    logInfo('getUrl', 'Url found', url);
    return url;
}

exports.checkHostnameValidity = checkHostnameValidity;
exports.buildNewShortUrl = buildNewShortUrl;
exports.saveUrl = saveUrl;
exports.getUrl = getUrl;
exports.createUrlObject = createUrlObject;
