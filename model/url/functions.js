const { getConfig } = require('../../config');
const { addHttp } = require('../../utils/url');
const { isLessThanOrThrow } = require('../../utils/errors');

function savePreSchemaHook() {
    this.original = addHttp(this.original);
}

function checkDatabaseUrlCount(count) {
    isLessThanOrThrow(getConfig().db.url.documentLimit, count, {
        errorMessage: 'Database capacity limit reached. Please contact the administrator.',
    });
}

async function countUrlDocuments() {
    const count = await this.estimatedDocumentCount().exec();

    return count;
}

async function createUrlDoc(hostname, count) {
    return new this({
        original: hostname,
        short: count + 1,
    });
}

exports.savePreSchemaHook = savePreSchemaHook;
exports.countUrlDocuments = countUrlDocuments;
exports.checkDatabaseUrlCount = checkDatabaseUrlCount;
exports.createUrlDoc = createUrlDoc;
