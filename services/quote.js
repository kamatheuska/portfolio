const movieQuotesList = require('../constants/movieQuotes');
const Randomize = require('../utils/randomize');
const { filterListByTruthyField } = require('../utils');

function getAuthoredRandomQuote() {
    const randomize = new Randomize();
    const authoredQuotes = filterListByTruthyField(movieQuotesList, 'quotes');
    return randomize.getRandomItemFromList(authoredQuotes);
}

exports.getAuthoredRandomQuote = getAuthoredRandomQuote;
