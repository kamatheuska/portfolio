// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    preset: '@shelf/jest-mongodb',
    testRegex: '/integration/',
    globalSetup: './tests/integration/setup.js',
};

module.exports = config;
