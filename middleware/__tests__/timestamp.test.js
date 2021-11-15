const { generateTimestamp, getTimestampByDate } = require('../timestamp');

let res;
let req;
let result;

describe('🌳  Timestamp Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('🌴 generateTimestamp', () => {
        beforeEach(() => {
            res = { locals: {}, send: jest.fn() };
            req = {};

            generateTimestamp(req, res);
        });

        it('🌱 should call res.send', () => {
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledTimes(1);
        });

        it('🌱 calls res.send with an object that represents a timestamp', () => {
            [[result]] = res.send.mock.calls;

            expect(typeof result.unix).toBe('number');
            expect(typeof result.utc).toBe('string');
        });
    });

    describe('🌴 getTimestampByDate', () => {
        beforeEach(() => {
            res = { locals: {}, send: jest.fn() };
            req = { params: { date: '1451001600000' } };

            getTimestampByDate(req, res);
        });

        it('🌱 should call res.send', () => {
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledTimes(1);
        });

        it('🌱 calls res.send with an object that represents a timestamp/date when date=%s or a', () => {
            [[result]] = res.send.mock.calls;

            expect(typeof result.unix).toBe('number');
            expect(typeof result.utc).toBe('string');
        });
    });
});
