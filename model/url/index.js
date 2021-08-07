const mongoose = require('mongoose');
const {
    savePreSchemaHook,
    countUrlDocuments,
    createUrlDoc,
    checkDatabaseUrlCount,
} = require('./functions');

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

const Url = mongoose.model('Url', urlSchema);

urlSchema.pre('save', savePreSchemaHook);
urlSchema.statics.countUrlDocuments = countUrlDocuments;
urlSchema.statics.createUrlDoc = createUrlDoc;
urlSchema.statics.checkDatabaseUrlCount = checkDatabaseUrlCount;

module.exports = Url;
