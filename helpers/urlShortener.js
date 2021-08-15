/**
 * @param {Object} req
 * @param {string} req.url
 */
export const isUrlShortenerError = (req) => /shorturl/.test(req.url);
