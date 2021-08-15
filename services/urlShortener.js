import dns from 'dns';
import util from 'util';
import _ from 'lodash';

import Url from '../model/Url';
import { DocumentNotFoundException, RequestParamException } from './exceptions';
import {
    isTypeOrThrow,
    isTruthyOrThrow,
    isEqualOrThrow,
    isTruthyOrThrowMessage,
} from '../utils/errors';
import { errorCode } from '../constants';


const dnsLookupPromisfied = util.promisify(dns.lookup);

export async function checkHostnameValidity(hostname) {
    try {
        isTruthyOrThrow(hostname, RequestParamException);

        await dnsLookupPromisfied(hostname);
        return true;
    } catch (error) {
        isEqualOrThrow(error.code, errorCode.ENOTFOUND);

        throw new RequestParamException(`${hostname} is an invalid url`);
    }
}

export async function buildNewShortUrl(hostname) {
    const count = await Url.countUrlDocuments();
    Url.checkDatabaseUrlCount(count);

    return Url.createUrlDoc(hostname, count);
}

export async function saveUrl(url) {
    return url.save();
}

/**
 * @param {Object} doc - saved url mongoose document
 */
export function createUrlObject({ short, original }, rawOriginalUrl) {
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

export async function findUrlById(shortId) {
    const url = await Url.findOne({ short: shortId }).exec();

    isTruthyOrThrowMessage(url, {
        errorMessage: `No url document found with ${shortId}`,
        GivenException: DocumentNotFoundException,
    });

    return url;
}

export async function getUrlById(shortId) {
    isTypeOrThrow(shortId);
    return findUrlById(shortId);
}
