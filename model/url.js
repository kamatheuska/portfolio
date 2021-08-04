const mongoose = require('mongoose');
const { addHttp } = require('../utils/url');

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

urlSchema.pre('save', function savePreSchemaHook() {
    this.original = addHttp(this.original);
});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
