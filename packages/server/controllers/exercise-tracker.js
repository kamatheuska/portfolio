const router = require('express').Router();
const { isDate, escape, isInt } = require('validator').default;

const {
    createExerciseUser,
    getAllExerciseUsers,
    addExerciseToUser,
    getExerciseLogsFromUser,
} = require('../middleware/exercise-tracker');

function isFormattedDate(date) {
    return isDate(date, { format: 'YYYY-MM-DD' });
}

router.post('/api/users', async (req, res, next) => {
    try {
        const { username } = req.body;

        const savedUser = await createExerciseUser({
            username: escape(username),
        });

        res.status(200).json(savedUser);
    } catch (error) {
        next(error);
    }
});

router.get('/api/users/', async (req, res, next) => {
    try {
        const users = await getAllExerciseUsers();

        res.send(users);
    } catch (error) {
        next(error);
    }
});

router.post('/api/users/:_id/exercises', async (req, res, next) => {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    try {
        if (date && !isFormattedDate(date)) throw new Error(`Date ${date} has an incorrect format`);

        const exercise = {
            description: escape(description),
            duration,
            date: date ? new Date(date) : new Date(),
        };

        const user = await addExerciseToUser(_id, exercise);

        const dto = user.toNewExerciseDTO(exercise);

        res.send(dto);
    } catch (error) {
        next(error);
    }
});

router.get('/api/users/:_id/logs', async (req, res, next) => {
    const { _id } = req.params;
    const { from, to, limit } = req.query;
    let parsedLimit;

    const parsedFrom = isFormattedDate(from) ? new Date(from).getTime() : null;
    const parsedTo = isFormattedDate(to) ? new Date(to).getTime() : null;

    if (limit && isInt(limit)) {
        parsedLimit = parseInt(limit);
    }

    try {
        const user = await getExerciseLogsFromUser(_id);
        const filteredExercises = user.exercises
            .filter((exercise) => {
                const exerciseUnixTime = exercise.date.getTime();
                return exerciseUnixTime >= parsedFrom && exerciseUnixTime <= parsedTo;
            })
            .slice(0, parsedLimit);

        const dto = user.toExerciseLogsDTO(filteredExercises);

        res.send(dto);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
