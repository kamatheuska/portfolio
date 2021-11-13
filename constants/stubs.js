const movieQuotesList = require('./movieQuotes');

const VALID_HOSTNAME = 'www.google.com';

const VALID_URL = `https://${VALID_HOSTNAME}`;

const INVALID_HOSTNAME = 'wwwasdasd.goo222gle.com';

const URL_DOCS_COUNT = 10;

const urlDoc = {
    _id: '610e898b8ee7f750f2fef893',
    original: 'http://www.google.com',
    short: '1',
    __v: 0,
};

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

const urlStubs = [
    {
        original: 'http://www.google.com',
        short: '1',
    },
    {
        original: 'http://www.facebook.com',
        short: '2',
    },
];

module.exports = {
    INVALID_HOSTNAME,
    NO_AUTHOR_QUOTES,
    NO_QUOTES,
    quotes,
    URL_DOCS_COUNT,
    urlDoc,
    VALID_HOSTNAME,
    VALID_URL,
    urlStubs,
};
