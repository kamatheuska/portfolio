const express = require('express')
const router = express.Router()
const movieQuotes = require('movie-quotes')
const { throwNewError } = require('../middleware/errors')

const { isString } = require('../helpers')

router.get('/api/quote', (req, res, next) => {
    let fullQuote = movieQuotes.random()
    let endOfQuote = fullQuote.indexOf('"', 1) + 1
    let parsedQuote = {
        text: fullQuote.slice(0, endOfQuote),
        author: fullQuote.slice(endOfQuote + 1)
    }
    if (isString(parsedQuote.text) && isString(parsedQuote.author)) {
        res.status(200).json(parsedQuote)
    } else {
        next(throwNewError('Error on Server. No quotes found', 'ValidationError'))
    }
})

module.exports = router
