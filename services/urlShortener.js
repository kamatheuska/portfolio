const dns = require('dns');
const util = require('util');
const dnsLookupPromisfied = util.promisify(dns.lookup);
const Url = require('../model/url');
  
async function checkAddressValidity(hostname) {
  const address = await dnsLookupPromisfied(hostname)
  console.info(`Looking address of ${hostname}`);

  if (!address) {
    new Error('URL not valid!');
  }
}

async function buildNewUrl(hostname) {
  const count = await Url.estimatedDocumentCount().exec();

  if (count > 100) {
    next(new Error('Database capacity limit reached. Please Contact the administrator.'))
  }

  return new Url({
    original: hostname,
    short:  count + 1
  })
}

async function saveUrl(url) {
  const savedUrl = await url.save();
  console.info('savedUrl: ', savedUrl);

  return {
    href: `/api/shorturl/${savedUrl.short}`,
    linkUrl: `/api/shorturl/${savedUrl.short}`,
    originalUrl: savedUrl.original,
    shortUrl: savedUrl.short
  }
}

async function getUrl(id) {
  return await Url.findOne({ short: id }).exec();
}

exports.checkAddressValidity = checkAddressValidity
exports.buildNewUrl = buildNewUrl
exports.saveUrl = saveUrl
exports.getUrl = getUrl