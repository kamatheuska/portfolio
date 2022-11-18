import util from 'util';
import dns from 'dns';
import createHttpError from 'http-errors';
import crypto from 'crypto';
import { getHostNameFromUrl } from '../../../utils/url.js';

const lookup = util.promisify(dns.lookup);
const urlError = message => createHttpError(400, message, { error: 'invalid url' });

class ShortUrlService {
  constructor(models, logger, { documentLimit }) {
    this.ShortUrl = models.ShortUrl;
    this.log = logger;
    this.dbDocumentLimit = documentLimit;
  }

  async create(url) {
    await this.validateUrl(url);
    await this.ShortUrl.checkDocumentCount(this.dbDocumentLimit);

    return this.build(url);
  }

  async build(url) {
    const log = this.log.child({ context: 'ShortUrlService.getUrl' });
    const hex = crypto.randomBytes(3).toString('hex');
    const short = `/short/${hex}`;

    const shortUrl = new this.ShortUrl({
      original: url,
      hex,
      short,
    });

    log.info(`New shortUrl: ${shortUrl}`);

    return shortUrl.save();
  }

  async get(shortUrl) {
    const log = this.log.child({ context: 'ShortUrlService.getUrl' });

    const url = await this.ShortUrl
      .findOne({ hex: shortUrl })
      .exec();

    if (!url) {
      throw new createHttpError.NotFound('Url was not found');
    }

    log.info(`Url found: ${url}`);

    return url;
  }

  async validateUrl(url) {
    const hostname = getHostNameFromUrl(url);

    if (!hostname) {
      throw urlError('Invalid Hostname');
    }

    await this.validateHostname(hostname);
  }

  async validateHostname(hostname = '') {
    try {
      await lookup(hostname);
    } catch (error) {
      if (error.code === 'ENOTFOUND') {
        throw urlError('Invalid Hostname');
      }

      throw error;
    }
  }
}

export default ShortUrlService;
