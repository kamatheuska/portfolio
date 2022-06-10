/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */

const mongoose = require('mongoose');
const { stopServer } = require('../utils/server');
const init = require('../app');

process.env.PORT = 9899;
process.env.NODE_ENV = 'test';
process.env.DEBUG_MODE = false;

mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;
jest.setTimeout(30000); // eslint-disable-line no-undef

let createdApp;
let createdServer;

const setupTests = async () => {
    try {
        const { app, server } = await init();

        createdApp = app;
        createdServer = server;
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
    }
};

beforeAll(async () => setupTests());
afterAll(async () => teardown(createdServer));

exports.cleanDb = cleanDb;
exports.dropAll = dropAll;
exports.setupTests = setupTests;
exports.teardown = teardown;
exports.getApp = () => createdApp;
