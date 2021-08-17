const movieQuotesList = require('../../constants/movieQuotes');

const quotes = [...movieQuotesList];

const NO_AUTHOR_QUOTES = [
    {
        text: 'feh',
        author: null,
    },
    {
        text: 'fah',
        author: null,
    },
    {
        text: 'fuh',
        author: null,
    },
];

const NO_QUOTES = [
    {
        text: 'feh',
    },
    {
        text: 'fah',
    },
    {
        text: 'fuh',
    },
];

module.exports = {
    quotes,
    NO_AUTHOR_QUOTES,
    NO_QUOTES,
};
