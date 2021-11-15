const cors = require('cors');
const express = require('express');
const history = require('connect-history-api-fallback');
const morgan = require('morgan');
const path = require('path');

const app = express();
const { initConfig, getConfig } = require('./config');
const { connectToDatabase, disconnectFromDatabase } = require('./db');
const { errorLogger, errorResponseMapper, defaultErrorResponse } = require('./middleware/errors');
const limiter = require('./middleware/rate-limiter');
const { logInfo } = require('./services/logger');

let config;
let server;
const fccCorsOptions = {
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

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

function setProductionMiddleware() {
    app.use(forceSsl);

    // see https://expressjs.com/en/guide/behind-proxies.html
    app.set('trust proxy', 1);
    app.use('/api', limiter);
}

function registerControllers() {
    if (config.nodeEnv === 'development') {
        app.use(morgan('dev'));
    } else if (config.nodeEnv === 'production') {
        setProductionMiddleware();
    }

    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(require('./middleware/logger'));

    app.use('/api/timestamp', require('./controllers/timestamp'));
    app.use('/api/whoami', cors(fccCorsOptions), require('./controllers/whoami'));
    app.use('/api/shorturl', require('./controllers/urlShortener'));
    app.use('/api/quote', require('./controllers/quote'));

    /**
     * View controllers
     */
    app.get(/projects\/react/, (req, res) => {
        res.sendFile(path.join(config.staticsFolder, '/react-projects/index.html'));
    });

    app.use(history({ verbose: true }));
    app.use(express.static(config.staticsFolder));
    app.get('/index.html', (req, res) => {
        res.sendFile(path.join(config.staticsFolder, '/landing/index.html'));
    });

    app.use(errorLogger);
    app.use(errorResponseMapper);
    app.use(defaultErrorResponse);
}

async function init() {
    initializeConfiguration();
    await connectToDatabase();
    registerControllers();
    server = startServer();
}

module.exports = {
    app,
    init,
    stopServer,
};
