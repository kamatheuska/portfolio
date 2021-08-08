const router = require('express').Router();

const { getRandomQuote } = require('../middleware/quote');

router.get('/authored/random', getRandomQuote, (req, res) => {
    const { quote } = res.locals;

    res.status(200).json(quote);
});

module.exports = router;
