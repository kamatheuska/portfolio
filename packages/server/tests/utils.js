/* eslint-disable no-undef */

function logJestError(error) {
    if (process.env.DEBUG_UNIT_TEST) {
        console.error(error);
    }
}

function setupProcessEnvMock(oldEnv) {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...oldEnv }; // Make a copy
}

exports.logJestError = logJestError;
exports.setupProcessEnvMock = setupProcessEnvMock;
