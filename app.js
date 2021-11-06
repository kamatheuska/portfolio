const express = require('express');
const path = require('path');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');

const app = express();
const { initConfig, getConfig } = require('./config');
const { connectToDatabase, disconnectFromDatabase } = require('./db');
const { errorLogger, errorResponseMapper, defaultErrorResponse } = require('./middleware/errors');
const { logInfo } = require('./services/logger');

let config;
let server;

function forceSsl(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(301, ['https://', req.get('Host'), req.url].join(''));
    }
    return next();
}

function initializeConfiguration() {
    initConfig();

    config = getConfig();
}

function startServer() {
    return app.listen(config.port, () => {
        logInfo('init.startServer', `Server started on port ${config.port}`);
    });
}

async function stopServer() {
    server.close(async () => {
        await disconnectFromDatabase();
    });
}

function registerControllers() {
    if (config.nodeEnv === 'development') {
        app.use(morgan('dev'));
    } else if (config.nodeEnv === 'production') {
        app.use(forceSsl);
    }
    const portfolioStatic = express.static(path.join(__dirname, 'public'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(require('./middleware/logger'));

    app.use('/api/shorturl', require('./controllers/urlShortener'));
    app.use('/api/quote', require('./controllers/quote'));
    app.use(history({ verbose: true }));
    app.use(portfolioStatic);
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/index.html'));
    });

    app.use(errorLogger);
    app.use(errorResponseMapper);
    app.use(defaultErrorResponse);
}

async function init() {
    initializeConfiguration();
    // if (!config.isTest) {
    await connectToDatabase();
    // }
    registerControllers();
    server = startServer();
}

module.exports = {
    app,
    init,
    stopServer,
};
