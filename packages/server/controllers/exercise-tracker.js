const router = require('express').Router();
const { escape, isInt } = require('validator').default;

const {
    createExerciseUser,
    getAllExerciseUsers,
    addExerciseToUser,
    getUserById,
} = require('../middleware/exercise-tracker');
const { isFormattedDate, isExerciseBetweenDates } = require('../utils/exercise-tracker');

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
            description: description ? escape(description) : description,
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

    if (!parsedFrom) console.warn('from query parameter is invalid. Skipping');
    if (!parsedTo) console.warn('to query parameter is invalid. Skipping');

    try {
        const user = await getUserById(_id);

        if (!user) throw new Error('No user found with that id');

        const filteredExercises = user.exercises
            .filter(isExerciseBetweenDates(parsedFrom, parsedTo))
            .slice(0, parsedLimit);

        const dto = user.toExerciseLogsDTO(filteredExercises);

        res.send(dto);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
