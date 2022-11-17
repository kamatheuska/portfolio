const { isDate } = require('validator').default;

function isFormattedDate(date) {
    return isDate(date, { format: 'YYYY-MM-DD' });
}

function isExerciseBetweenDates(from, to) {
    return (exercise) => {
        const exerciseUnixTime = exercise.date.getTime();
        if (from && to) return exerciseUnixTime >= from && exerciseUnixTime <= to;
        if (from) return exerciseUnixTime >= from;
        if (to) return exerciseUnixTime <= to;
        return true;
    };
}

exports.isFormattedDate = isFormattedDate;
exports.isExerciseBetweenDates = isExerciseBetweenDates;
