const ExerciseUser = require('../model/exercise-tracker/user');

async function createExerciseUser(user) {
    const exerciseUser = new ExerciseUser(user);

    const savedUser = exerciseUser.save();

    return savedUser;
}

async function getAllExerciseUsers() {
    const users = await ExerciseUser.find({});

    return users;
}

async function addExerciseToUser(userId, exercise) {
    const user = await ExerciseUser.findById(userId).exec();

    user.exercises.push(exercise);

    const savedUser = await user.save();

    return savedUser;
}

async function getExerciseLogsFromUser(userId) {
    const user = await ExerciseUser.findById(userId).exec();

    return user;
}

exports.createExerciseUser = createExerciseUser;
exports.getAllExerciseUsers = getAllExerciseUsers;
exports.addExerciseToUser = addExerciseToUser;
exports.getExerciseLogsFromUser = getExerciseLogsFromUser;
