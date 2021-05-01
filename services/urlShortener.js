const dns = require('dns');
const util = require('util');
const dnsLookupPromisfied = util.promisify(dns.lookup);
const Url = require('../model/url');
const { logRequestInfo, logInfo } = require('../services/logger')
const { DocumentNotFoundException, TypeErrorException } = require('../services/exceptions');
const { isTypeOrThrowException } = require('../utils');

async function checkAddressValidity(hostname) {
  const address = await dnsLookupPromisfied(hostname)

  if (!address) {
    new Error('URL not valid!');
  }
}

async function buildNewUrl(hostname) {
  const count = await Url.estimatedDocumentCount().exec();

  if (count > 100) {
    next(new Error('Database capacity limit reached. Please Contact the administrator.'))
  }

  const newUrl = new Url({
    original: hostname,
    short:  count + 1
  })

  logRequestInfo(newUrl);

  return newUrl;
}

async function saveUrl(url) {
  const savedUrl = await url.save();
  logRequestInfo('savedUrl: ', savedUrl);

  return {
    href: `/api/shorturl/${savedUrl.short}`,
    linkUrl: `/api/shorturl/${savedUrl.short}`,
    originalUrl: savedUrl.original,
    shortUrl: savedUrl.short
  }
}

async function getUrl(shortId) {
  isTypeOrThrowException(shortId)
  return await findUrlById(shortId)
}

async function findUrlById(shortId) {
  const url = await Url.findOne({ short: shortId }).exec();

  if(!url) {
    throw new DocumentNotFoundException(`No url document found with ${shortId}`)
  }

  logInfo('getUrl', 'Url found', url)
  return url
}

exports.checkAddressValidity = checkAddressValidity
exports.buildNewUrl = buildNewUrl
exports.saveUrl = saveUrl
exports.getUrl = getUrl