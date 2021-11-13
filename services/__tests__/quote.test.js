jest.mock('../../utils');
jest.mock('../../utils/randomize', () =>
    jest.fn().mockImplementation(() => ({
        getRandomItemFromList: jest.fn(),
    })),
);

const { getAuthoredRandomQuote } = require('../quote');
const Randomize = require('../../utils/randomize');
const utils = require('../../utils');
const { quotes } = require('../../constants/stubs');
const { QUOTES_INDEX_KEY } = require('../../constants');

let result;
let getRandomItemFromListMock;

describe('🌳  QuoteService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('🌴 getAuthoredRandomQuote', () => {
        getRandomItemFromListMock = jest.fn();
        const authoredQuotes = quotes.filter((quote) => !!quote.author);

        beforeEach(() => {
            getRandomItemFromListMock.mockClear();

            Randomize.mockImplementationOnce(() => ({
                getRandomItemFromList: getRandomItemFromListMock,
            }));

            getRandomItemFromListMock.mockReturnValue(authoredQuotes[0]);
            utils.filterListByTruthyField.mockReturnValue(authoredQuotes);
            result = getAuthoredRandomQuote();
        });

        it('🌱 should return a randomQuote', () => {
            expect(result).toEqual(authoredQuotes[0]);
        });

        it('🌱 should return a quote with an author', () => {
            expect(result.author).toBe(authoredQuotes[0].author);
        });

        it('🌱 should call getRandomItemFromList with the right values', () => {
            expect(getRandomItemFromListMock).toHaveBeenCalled();
            expect(getRandomItemFromListMock).toHaveBeenCalledTimes(1);
            expect(getRandomItemFromListMock).toHaveBeenCalledWith(authoredQuotes);
        });

        it('🌱 should call filterListByTruthyField with the right values', () => {
            expect(utils.filterListByTruthyField).toHaveBeenCalled();
            expect(utils.filterListByTruthyField).toHaveBeenCalledTimes(1);
            expect(utils.filterListByTruthyField.mock.calls[0][1]).toBe(QUOTES_INDEX_KEY);
        });
    });
});
