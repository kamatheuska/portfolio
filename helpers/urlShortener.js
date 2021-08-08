/**
 * @param {Object} req
 * @param {string} req.url
 */
const isUrlShortenerError = (req) => /shorturl/.test(req.url);

exports.isUrlShortenerError = isUrlShortenerError;
