const router = require('express').Router();

const { getQuote } = require('../middleware/quote');

router.get('/', getQuote, (req, res, next) => {
    const { quote } = res.locals;

    if (!quote) return next();

    res.status(200).json({ quote });
});

module.exports = router;
