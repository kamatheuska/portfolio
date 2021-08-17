const { hasProperty, isString, toBoolean, filterListByTruthyField } = require('../../../utils');
const { quotes } = require('../../mocks');

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
});
