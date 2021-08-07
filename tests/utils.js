function logJestError(error) {
    if (process.env.DEBUG_UNIT_TEST) {
        console.error(error);
    }
}

exports.logJestError = logJestError;
