const { getConfig } = require('../../config');
const { addHttp } = require('../../utils/url');
const { isEqualOrThrow } = require('../../utils/errors');
const Url = require('.');

function savePreSchemaHook() {
    this.original = addHttp(this.original);
}

function checkDatabaseUrlCount(count) {
    isEqualOrThrow(count, getConfig().db.url.documentLimit, {
        errorMessage: 'Database capacity limit reached. Please Contact the administrator.',
    });
}

async function countUrlDocuments() {
    const count = await this.estimatedDocumentCount().exec();

    return count;
}

async function createUrlDoc(hostname, count) {
    return new Url({
        original: hostname,
        short: count + 1,
    });
}

exports.savePreSchemaHook = savePreSchemaHook;
exports.countUrlDocuments = countUrlDocuments;
exports.checkDatabaseUrlCount = checkDatabaseUrlCount;
exports.createUrlDoc = createUrlDoc;
