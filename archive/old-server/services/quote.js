const movieQuotesList = require('../constants/movieQuotes');
const Randomize = require('../utils/randomize');
const { filterListByTruthyField } = require('../utils');
const { QUOTES_INDEX_KEY } = require('../constants');

function getAuthoredRandomQuote() {
    const randomize = new Randomize();
    const authoredQuotes = filterListByTruthyField(movieQuotesList, QUOTES_INDEX_KEY);
    return randomize.getRandomItemFromList(authoredQuotes);
}

exports.getAuthoredRandomQuote = getAuthoredRandomQuote;
