const express = require('express');
const setupApp = require('./setup');

const { connectToDatabase } = require('./db');
const { initConfig } = require('./config');
const { startServer } = require('./utils/server');

async function init() {
    const app = express();

    initConfig();
    await connectToDatabase();
    setupApp(app);
    const server = startServer(app);

    return { app, server };
}

module.exports = init;
