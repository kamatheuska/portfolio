// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    preset: '@shelf/jest-mongodb',
    testRegex: '/integration/',
};

module.exports = config;
