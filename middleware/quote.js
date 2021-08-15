const movieQuotesList = require('../constants/movieQuotes');
const { getRandomItemFromList } = require('../utils');
const { getAuthoredQuotes } = require('../helpers/quotes');

export function getRandomQuote(req, res, next) {
    const authoredQuotes = getAuthoredQuotes(movieQuotesList);
    res.locals.quote = getRandomItemFromList(authoredQuotes);
    next();
}
