const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const { initConfig, getConfig } = require('./config');
const { connectToMongoose } = require('./db');
const { errorLogger, errorResponseHandler } = require('./middleware/errors');
const { logError, logInfo } = require('./services/logger');

let config;

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
    app.listen(config.port, () => {
        logInfo('init.startServer', `Server started on port ${config.port}`);
    });
}

function registerControllers() {
    if (config.nodeEnv === 'development') {
        app.use(morgan('dev'));
    } else if (config.nodeEnv === 'production') {
        app.use(forceSsl);
    }

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/shorturl/', require('./controllers/urlShortener'));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/index.html'));
    });

    app.use(errorLogger);
    app.use(errorResponseHandler);
}

async function init() {
    initializeConfiguration();
    await connectToMongoose();
    registerControllers();
    startServer();
}

init().catch((error) => logError('init', error));
