const { getAuthoredRandomQuote } = require('../services/quote');
const { toBoolean } = require('../utils');

function getQuote(req, res, next) {
    const isRandom = toBoolean(req.query.random);
    let quote;

    if (isRandom) {
        quote = getAuthoredRandomQuote();
    } else {
        quote = [];
    }

    res.locals.quote = quote;
    next();
}

exports.getQuote = getQuote;
