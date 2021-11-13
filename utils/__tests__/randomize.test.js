const Randomize = require('../randomize');
const { quotes } = require('../../constants/stubs');

let result;

describe('🌳 Randomize', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('🌴 getNonConsecutiveIntegerFunc', () => {
        let first;
        let second;
        let third;
        let fourth;
        it.each([
            // min, max
            [2, 300],
            [3, 5],
            [500, 2000],
            [1000, 100000],
            [1.1, 3.52],
        ])(
            '🌱 should return a random number that was not used before for min %s and max %s',
            (min, max) => {
                const randomize = new Randomize();
                first = randomize.getNonConsecutiveInteger(min, max);
                second = randomize.getNonConsecutiveInteger(min, max);
                third = randomize.getNonConsecutiveInteger(min, max);
                fourth = randomize.getNonConsecutiveInteger(min, max);
                expect(first).not.toBe(second);
                expect(second).not.toBe(third);
                expect(third).not.toBe(fourth);
            },
        );

        it('🌱 should return always the same number if min and max are the same', () => {
            const randomize = new Randomize();
            result = randomize.getNonConsecutiveInteger(100, 100);
            expect(result).toBe(100);
        });
    });
    describe('🌴 getRandomItemFromList', () => {
        const RANDOMIZED_INDEX = 2;
        let spy;

        beforeEach(() => {
            const randomize = new Randomize();
            spy = jest
                .spyOn(randomize, 'getNonConsecutiveInteger')
                .mockImplementation(() => RANDOMIZED_INDEX);

            result = randomize.getRandomItemFromList(quotes);
        });

        it('🌱 should return a random item of a list', () => {
            expect(result).toBe(quotes[RANDOMIZED_INDEX]);
        });
        it('🌱 should call getNonConsecutiveInteger method with the right arguments', () => {
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(0, quotes.length - 1);
        });
    });
});
