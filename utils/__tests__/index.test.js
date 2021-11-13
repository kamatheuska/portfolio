const {
    hasProperty,
    isString,
    toBoolean,
    filterListByTruthyField,
    createTimestampFromDate,
    parseDateString,
} = require('..');
const { quotes } = require('../../constants/stubs');

let subject;
let result;

describe('🌳  Utils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('🌴 hasProperty', () => {
        it.each([
            // expected, parentKey, key
            [true, 'foo', 'foo'],
            [false, 'foo', 'foo2'],
        ])(
            '🌱 should return %s when parent has a property "%s" nad the key passed is %s',
            (expected, parentKey, key) => {
                subject = { [parentKey]: '' };
                result = hasProperty(subject, key);

                expect(result).toBe(expected);
            },
        );
    });

    describe('🌴 isString', () => {
        it.each([
            // expected, arg
            [true, 'foo'],
            [false, ''],
            [false, 91],
            [false, () => {}],
            [false, '   '],
        ])('🌱 should return %s when arg is "%s"', (expected, arg) => {
            result = isString(arg);

            expect(result).toBe(expected);
        });
    });
    describe('🌴 toBoolean', () => {
        let isStringMock;

        it.each([
            // expected, arg, isStringResult
            [true, 'true', true],
            [false, 'false', true],
            [false, 'falsy value', true],
            [false, 'true', false],
            [false, ['not a string value'], false],
        ])(
            '🌱 should return %s argument %s if isString returns %s',
            (expected, arg, isStringResult) => {
                isStringMock = jest.fn().mockImplementationOnce(() => isStringResult);
                result = toBoolean(arg, isStringMock);

                expect(result).toBe(expected);
            },
        );
        it('🌱 should call isString method', () => {
            isStringMock = jest.fn().mockImplementationOnce(() => true);
            subject = 'arg';
            result = toBoolean(subject, isStringMock);

            expect(isStringMock).toHaveBeenCalled();
            expect(isStringMock).toHaveBeenCalledWith(subject);
        });
    });

    describe('🌴 filterListByTruthyField', () => {
        const list = [
            { name: 'foo', data: 'test' },
            { name: 'feh', data: 'foh' },
            { name: 'fah', data: 'foh' },
            { name: 'fah', data: 'foh' },
        ];
        const hasPropertyFnMock = jest.fn();
        const mocks = { hasPropertyFn: hasPropertyFnMock };

        it('🌱 should return a filtered list with', () => {
            const field = 'author';
            hasPropertyFnMock.mockReturnValue(true);

            result = filterListByTruthyField(quotes, field, mocks);

            expect(Array.isArray(result)).toBeTruthy();
            expect(result.length).toBeGreaterThan(0);

            result.forEach((item) => {
                expect(item[field]).toBeDefined();
            });
        });
        it('🌱 should return an empty array if list does not have an item with the given field', () => {
            const field = 'author';
            result = filterListByTruthyField(list, field, mocks);
            hasPropertyFnMock.mockReturnValue(true);
            expect(Array.isArray(result)).toBeTruthy();
            expect(result).toHaveLength(0);
        });

        it('🌱 should return an empty array if list has an item with a falsy value', () => {
            const field = 'author';
            hasPropertyFnMock.mockReturnValue(false);
            result = filterListByTruthyField(
                [
                    ...list,
                    { name: 'fah', data: 'foh', [field]: null },
                    { name: 'fah', data: 'foh', [field]: 'undefined' },
                    { name: 'fah', data: 'foh', [field]: undefined },
                ],
                field,
                mocks,
            );
            expect(Array.isArray(result)).toBeTruthy();
            expect(result).toHaveLength(0);
        });
    });

    describe('🌴 createTimestampFromDate', () => {
        it.each([
            ['December 17, 1995 13:24:00'],
            ['1995-12-17T13:24:00'],
            [undefined],
            [null],
            [''],
        ])('🌱 should return a valid timestamp when date passed "%s" is valid', (date) => {
            result = createTimestampFromDate(date);

            expect(typeof result.unix).toBe('number');
            expect(typeof result.utc).toBe('string');
            expect(typeof result.isValid).toBeTruthy();
        });
        it('🌱 should return Invalid date if passed date is an invalid date string', () => {
            result = createTimestampFromDate('some invalid string date');

            expect(result.isValid).toBeFalsy();
        });
    });

    describe('🌴 parseDateString', () => {
        it.each([
            ['number', 1223455000],
            ['number', 23],
            ['string', '1995-12-17T13:24:00'],
            ['string', 'December%2017,%201995%2013:24:00'],
        ])('🌱 should return a type %s when date is %s', (expected, date) => {
            result = parseDateString(date);

            expect(typeof result).toBe(expected);
        });

        it.each([
            ['1995-12-17T13:24:00', '1995-12-17T13:24:00'],
            ['December 17, 1995 13:24:00', 'December%2017,%201995%2013:24:00'],
        ])('🌱 should return decoded string %s when date is %s', (expected, date) => {
            result = parseDateString(date);

            expect(result).toBe(expected);
        });
    });
});
