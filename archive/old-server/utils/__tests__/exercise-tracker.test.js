const { isExerciseBetweenDates } = require('../exercise-tracker');

describe('Exercise Tracker Utils', () => {
    describe('isExerciseBetweenDates', () => {
        const exercises = [
            { date: new Date('2022-01-01') },
            { date: new Date('2022-02-01') },
            { date: new Date('2022-03-01') },
            { date: new Date('2022-04-01') },
        ];
        it.each([
            [undefined, undefined, [exercises[0], exercises[1], exercises[2], exercises[3]]],
            [
                new Date('2022-01-31').getTime(),
                undefined,
                [exercises[1], exercises[2], exercises[3]],
            ],
            [
                new Date('2022-02-01').getTime(),
                undefined,
                [exercises[1], exercises[2], exercises[3]],
            ],
            [new Date('2022-02-02').getTime(), undefined, [exercises[2], exercises[3]]],
            [
                new Date('2022-02-01').getTime(),
                new Date('2022-03-31').getTime(),
                [exercises[1], exercises[2]],
            ],
            [new Date('2022-04-01').getTime(), new Date('2022-01-31').getTime(), []],
        ])(
            'returns filtered exercises by date when from = %s and to = %s',
            (from, to, expected) => {
                const filteredExercises = exercises.filter(isExerciseBetweenDates(from, to));
                expect(filteredExercises).toEqual(expected);
            },
        );
    });
});
