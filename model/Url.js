import mongoose from 'mongoose';

import { getConfig } from '../config';
import { addHttp } from '../utils/url';
import { isLessThanOrThrow } from '../utils/errors';


export function savePreSchemaHook() {
    this.original = addHttp(this.original);
}

export function checkDatabaseUrlCount(count) {
    isLessThanOrThrow(count, getConfig().db.url.documentLimit, {
        errorMessage: 'Database capacity limit reached. Please contact the administrator.',
    });
}

export async function countUrlDocuments() {
    const count = await this.estimatedDocumentCount().exec();

    return count;
}

export async function createUrlDoc(hostname, count) {
    return new this({
        original: hostname,
        short: count + 1,
    });
}

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

urlSchema.pre('save', savePreSchemaHook);

urlSchema.statics.countUrlDocuments = countUrlDocuments;
urlSchema.statics.createUrlDoc = createUrlDoc;
urlSchema.statics.checkDatabaseUrlCount = checkDatabaseUrlCount;

const Url = mongoose.model('Url', urlSchema);

export default Url;