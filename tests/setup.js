/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

const mongoose = require('mongoose');
const { stopServer } = require('../utils/server');
const init = require('../app');
const { toBoolean } = require('../utils');

let forceExit;

const setTestDefaults = ({ timeout = 30000, port = 9899, debug = 'false' } = {}) => {
    process.env.PORT = port;
    process.env.NODE_ENV = 'test';
    process.env.DEBUG_MODE = debug;
    forceExit = toBoolean(process.env.FORCE_EXIT || true);

    jest.setTimeout(timeout); // eslint-disable-line no-undef
    mongoose.set('useCreateIndex', true);
    mongoose.promise = global.Promise;
};

const setupTests = async ({ timeout, port } = {}) => {
    setTestDefaults({ timeout, port });

    try {
        const instance = await init();
        return instance;
    } catch (error) {
        console.error(error);
    }
};

const cleanDb = async () => {
    const collections = Object.keys(mongoose.connection.collections);

    for (const name of collections) {
        const collection = mongoose.connection.collections[name];
        await collection.deleteMany();
    }
};

const dropAll = async () => {
    const collections = Object.keys(mongoose.connection.collections);

    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        try {
            await collection.drop();
        } catch (error) {
            // Sometimes this error happens, but you can safely ignore it
            if (error.message === 'ns not found') return;
            // This error occurs when you use it.todo. You can
            // safely ignore this error too
            if (error.message.includes('a background operation is currently running')) return;
            console.error(error.message);
        }
    }
};

const teardown = async (server) => {
    try {
        await dropAll();
        await stopServer(server);
    } catch (error) {
        console.error(error);
        if (forceExit) process.exit(1);
    }
};

exports.cleanDb = cleanDb;
exports.dropAll = dropAll;
exports.setupTests = setupTests;
exports.teardown = teardown;
