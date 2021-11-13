jest.mock('../../utils');
jest.mock('../../services/quote');

const { getAuthoredRandomQuote } = require('../../services/quote');
const { getQuote } = require('../quote');
const { toBoolean } = require('../../utils');
const { quotes } = require('../../tests/mocks');

let res;
let req;
let nextMock;

describe('🌳  Quote Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('🌴 getQuote', () => {
        beforeEach(() => {
            res = { locals: {} };
            req = { ...req, query: { random: 'true' } };
            nextMock = jest.fn();
        });

        describe('🍉 Basic Case', () => {
            beforeEach(() => {
                getAuthoredRandomQuote.mockReturnValue(quotes[0]);
                toBoolean.mockReturnValue(true);

                getQuote(req, res, nextMock);
            });

            it('🌱 should set a quotes object on the express response object', () => {
                expect(res.locals.quote).toBe(quotes[0]);
            });

            it('🌱 should call the next function to continue to the next middleware', () => {
                expect(nextMock).toHaveBeenCalled();
                expect(nextMock).toHaveBeenCalledTimes(1);
            });

            it('🌱 should call #toBoolean', () => {
                expect(toBoolean).toHaveBeenCalled();
                expect(toBoolean).toHaveBeenCalledTimes(1);
            });
        });

        describe('🍉 No Random Quotes', () => {
            beforeEach(() => {
                const customRes = {
                    ...res,
                    query: {
                        local: false,
                    },
                };
                getAuthoredRandomQuote.mockReturnValue(quotes[0]);
                toBoolean.mockReturnValue(false);

                getQuote(req, customRes, nextMock);
            });

            it('🌱 should not set a quote object if random is not truthy', () => {
                expect(res.locals.quote).toBeUndefined();
            });
        });

        describe('🍉 Random Quotes', () => {
            it('🌱 should call the #getAuthoredRandomQuote if query.random = true', () => {
                getAuthoredRandomQuote.mockReturnValue(quotes[0]);
                toBoolean.mockReturnValue(true);

                getQuote(req, res, nextMock);
                expect(getAuthoredRandomQuote).toHaveBeenCalled();
            });
            it('🌱 should not call the #getAuthoredRandomQuote if query.random = false', () => {
                const customRes = {
                    ...res,
                    query: {
                        local: false,
                    },
                };
                getAuthoredRandomQuote.mockReturnValue(quotes[0]);
                toBoolean.mockReturnValue(false);

                getQuote(req, customRes, nextMock);
                expect(getAuthoredRandomQuote).not.toHaveBeenCalled();
            });
        });
    });
});
