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
    unique: true,
  },
});

function savePreSchemaHook() {
  this.original = addHttp(this.original);
}

async function checkDocumentCount(documentLimit) {
  const count = await this.estimatedDocumentCount().exec();

  if (documentLimit < count) {
    throw new createHttpError.BadRequest('Database capacity limit reached. Please contact the administrator');
  }
}

urlSchema.pre('save', savePreSchemaHook);
urlSchema.statics.checkDocumentCount = checkDocumentCount;

export const modelAlias = 'ShortUrl';

const Url = mongoose.model(modelAlias, urlSchema);

export const model = Url;

