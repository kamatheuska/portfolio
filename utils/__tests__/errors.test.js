const { DocumentNotFoundException } = require('../../services/exceptions');
const { isEqualOrThrow, isLessThanOrThrow } = require('../errors');

describe('🌳  Errors Utils', () => {
    describe('🌴 isEqualOrThrow', () => {
        it('🌱 returns undefined when subject and target are in strict equality', () => {
            expect(() => {
                isEqualOrThrow('some string', 'some string');
            }).not.toThrow();
        });

        it.each([
            [true, false],
            ['some str', 'another str'],
            [3, 6],
        ])(
            '🌱 throws error when subject=%s and target=%s are not in strict equality',
            (subject, target) => {
                expect(() => {
                    isEqualOrThrow(subject, target);
                }).toThrow();
            },
        );

        it('🌱 throws with given error Exception', () => {
            expect(() => {
                isEqualOrThrow('some str', 'another str', {
                    GivenException: DocumentNotFoundException,
                });
            }).toThrowError(DocumentNotFoundException);
        });

        it('🌱 throws with given error message', () => {
            const errorMessage = 'Result is not correct';
            expect(() => {
                isEqualOrThrow('some str', 'another str', {
                    GivenException: DocumentNotFoundException,
                    errorMessage,
                });
            }).toThrowError(
                `Subject "some str" is not of equal to "another str" -> ${errorMessage}`,
            );
        });
    });

    describe('🌴 isLessThanOrThrow', () => {
        it.each([
            [1, 100],
            [2, 4],
            ['some string', 'some stringsss'],
        ])('🌱 returns undefined when subject=%s is less than target=%s', (subject, target) => {
            expect(() => {
                isLessThanOrThrow(subject, target);
            }).not.toThrow();
        });
        it.each([
            [1000, 100],
            [7, 4],
            ['some stringsss', 'some string'],
        ])('🌱 throws error when subject=%s is bigger than target=%s a', (subject, target) => {
            expect(() => {
                isLessThanOrThrow(subject, target);
            }).toThrow();
        });

        it('🌱 throws with given error Exception', () => {
            expect(() => {
                isLessThanOrThrow(12, 3, {
                    GivenException: DocumentNotFoundException,
                });
            }).toThrowError(DocumentNotFoundException);
        });

        it('🌱 throws with given error message', () => {
            const errorMessage = 'Result is not correct';
            expect(() => {
                isLessThanOrThrow(12, 3, {
                    GivenException: DocumentNotFoundException,
                    errorMessage,
                });
            }).toThrowError(`Subject "12" should be less than "3" -> ${errorMessage}`);
        });
    });
});
