const Url = require('../../model/url');
const { urlStubs } = require('../../constants/stubs');

const seedUrls = async () => Url.insertMany(urlStubs);

exports.seedUrls = seedUrls;
