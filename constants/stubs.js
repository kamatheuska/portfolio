const faker = require('faker');
const mongoose = require('mongoose');

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

/**
 * @param {Number} amount
 * @param {Boolean} hasId - defines if stubs have a mongoose Object id or not
 */
const generatePostStubs = (amount, hasId) =>
    [...Array(amount)].map(() => ({
        content: faker.lorem.paragraphs(3),
        title: faker.lorem.sentence(6),
        ...(hasId ? { _id: mongoose.Types.ObjectId() } : {}),
    }));

const ACCEPT_LANGUAGE_HEADER_STUB = 'en-US,en;q=0.9';
const USER_AGENT_HEADER_STUB =
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36';
const INVALID_URL_ERROR = { error: 'invalid url' };

module.exports = {
    ACCEPT_LANGUAGE_HEADER_STUB,
    generatePostStubs,
    INVALID_HOSTNAME,
    INVALID_URL_ERROR,
    NO_AUTHOR_QUOTES,
    NO_QUOTES,
    quotes,
    URL_DOCS_COUNT,
    urlDoc,
    urlStubs,
    USER_AGENT_HEADER_STUB,
    VALID_HOSTNAME,
    VALID_URL,
};
