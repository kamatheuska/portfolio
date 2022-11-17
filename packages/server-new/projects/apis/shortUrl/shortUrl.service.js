import util from 'util';
import dns from 'dns';
import createHttpError from 'http-errors';
import { getHostNameFromUrl } from '../../../utils/url.js';

const lookup = util.promisify(dns.lookup);

class ShortUrlService {
	constructor(models, logger, { documentLimit }) {
		this.ShortUrl = models.ShortUrl;
		this.log = logger;
		this.dbDocumentLimit = documentLimit;
	}

	async create(url) {
		await this.validateUrl(url);
		return this.build(url);
	}

	async get(id) {
		const log = this.log.child({ context: 'ShortUrlService.getUrl' });

		const url = await this.ShortUrl
			.findOne({ short: id })
			.exec();

		if (!url) {
			throw new createHttpError.NotFound('Url was not found');
		}

		log.info(`Url found: ${url}`);
	}

	async validateUrl(url) {
		const hostname = getHostNameFromUrl(url);

		if (!hostname) {
			throw ShortUrlService.urlError('Invalid Hostname');
		}

		await this.validateHostname(hostname);
	}

	async validateHostname(hostname = '') {
		try {
			await lookup(hostname);
		} catch (error) {
			if (error.code === 'ENOTFOUND') {
				throw ShortUrlService.urlError('Invalid Hostname');
			}

			throw error;
		}
	}

	async build(url) {
		const { ShortUrl } = this;

		const count = await ShortUrl.countUrlDocuments();
		ShortUrl.checkDatabaseUrlCount(this.dbDocumentLimit, count);

		return ShortUrl.createUrlDoc(url, count);
	}

	static urlError(message) {
		return createHttpError(400, message, { error: 'invalid url' });
	}
}

export default ShortUrlService;
