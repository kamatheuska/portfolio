import mongoose from 'mongoose';
import { addHttp } from '../../../utils/url.js';
import createHttpError from 'http-errors';

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

function checkDatabaseUrlCount(documentLimit, count) {
	if (documentLimit < count) {
		throw new createHttpError.BadRequest('Database capacity limit reached. Please contact the administrator');
	}
}

async function countUrlDocuments() {
	const count = await this.estimatedDocumentCount().exec();

	return count;
}

/**
* Return a new Url object
*
* @param {String} url
* @param {Number} count
*
* @returns {UrlModel}
*/
async function createUrlDoc(url, count) {
	return new this({
		original: url,
		short: count + 1,
	});
}

urlSchema.pre('save', savePreSchemaHook);
urlSchema.statics.countUrlDocuments = countUrlDocuments;
urlSchema.statics.createUrlDoc = createUrlDoc;
urlSchema.statics.checkDatabaseUrlCount = checkDatabaseUrlCount;

export const modelAlias = 'ShortUrl';

const Url = mongoose.model(modelAlias, urlSchema);

export const model = Url;

