import { jest } from '@jest/globals';

export function logJestError(error) {
    if (process.env.DEBUG_UNIT_TEST) {
        console.error(error);
    }
}

export function setupProcessEnvMock(oldEnv) {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...oldEnv }; // Make a copy
}
