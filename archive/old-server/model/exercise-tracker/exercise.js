const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        max: 500,
    },
    // in minutes
    duration: {
        type: Number,
        min: 1,
        max: 10000,
    },
    date: Date,
});

exerciseSchema.methods.toDTO = function toDTO() {
    return {
        description: this.description,
        duration: this.duration,
        date: this.date.toDateString(),
    };
};

const Exercise = mongoose.model('Exercise', exerciseSchema);

exports.exerciseSchema = exerciseSchema;
exports.Exercise = Exercise;
