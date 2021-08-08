const { getAuthoredQuotes } = require('../../../helpers/quotes');
const { quotes } = require('../../mocks');

let result;
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

describe('🌳  Quote Helpers', () => {
    describe('🌴 getAuthoredQuotes', () => {
        it('🌱 should return only authored quotes when passed', () => {
            result = getAuthoredQuotes(quotes);
            expect(result.find((r) => !r.author)).toBeFalsy();
        });

        it('🌱 should return an empty array when there are no authored quotes', () => {
            result = getAuthoredQuotes(NO_AUTHOR_QUOTES);
            expect(result).toHaveLength(0);
        });

        it('🌱 should return an empty array when objects passed are notquotes', () => {
            result = getAuthoredQuotes(NO_QUOTES);
            expect(result).toHaveLength(0);
        });
    });
});
