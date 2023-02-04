const { getAuthoredRandomQuote } = require('../services/quote');
const { toBoolean } = require('../utils');

function getQuote(req, res, next) {
    const isRandom = toBoolean(req.query.random);

    if (isRandom) {
        res.locals.quote = getAuthoredRandomQuote();
    }

    next();
}

exports.getQuote = getQuote;
