const mongoose = require('mongoose');
const { exerciseSchema } = require('./exercise');

const exerciseUserSchema = new mongoose.Schema({
    username: {
        type: String,
        max: 50,
        required: true,
        unique: true,
    },
    exercises: [exerciseSchema],
});

exerciseUserSchema.methods.toNewExerciseDTO = function toNewExerciseDTO(exercise) {
    return {
        _id: this._id,
        username: this.username,
        description: exercise.description,
        duration: parseInt(exercise.duration),
        date: exercise.date.toDateString(),
    };
};

exerciseUserSchema.methods.toExerciseLogsDTO = function toExerciseLogsDTO(exercises) {
    return {
        _id: this._id,
        username: this.username,
        count: exercises.length,
        log: exercises.map((exercise) => exercise.toDTO()).toObject(),
    };
};

const ExerciseUser = mongoose.model('ExerciseUser', exerciseUserSchema);

module.exports = ExerciseUser;
