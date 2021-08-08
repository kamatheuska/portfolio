/**
 * @typedef Quote
 * @type {object}
 * @property {string} text
 * @property {string} author
 */

/**
 * @param {Quote[]} quotes
 * @param {string} quotes.quotes
 * @param {string} quotes
 */
function getAuthoredQuotes(quotes) {
    return Array.isArray(quotes) ? quotes.filter((quote) => !!quote.author) : [];
}

exports.getAuthoredQuotes = getAuthoredQuotes;
