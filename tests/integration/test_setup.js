/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */

const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;

async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }
}

async function dropAllCollections() {
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
            console.log(error.message);
        }
    }
}

module.exports = {
    setupDB(seedAsyncDatabaseCallback, init, stopServer) {
        // Connect to Mongoose
        beforeAll(async () => {
            init().catch((error) => console.error(error));
        });

        beforeEach(async () => {
            await seedAsyncDatabaseCallback();
        });

        // Cleans up database between each test
        afterEach(async () => {
            await removeAllCollections();
        });

        // Disconnect Mongoose
        afterAll(async () => {
            try {
                await dropAllCollections();
                await stopServer();
            } catch (error) {
                console.error(error);
                process.exit(1);
            }
        });
    },
};
