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

async function getUserById(userId) {
    const user = await ExerciseUser.findById(userId).exec();

    if (!user) throw new Error(`No user found with user id ${userId}`);

    return user;
}

async function addExerciseToUser(userId, exercise) {
    const user = await getUserById(userId);

    user.exercises.push(exercise);

    const savedUser = await user.save();

    return savedUser;
}

exports.createExerciseUser = createExerciseUser;
exports.getAllExerciseUsers = getAllExerciseUsers;
exports.addExerciseToUser = addExerciseToUser;
exports.getUserById = getUserById;
