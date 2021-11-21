const cors = require('cors');
const express = require('express');
const history = require('connect-history-api-fallback');
const morgan = require('morgan');
const path = require('path');

const limiter = require('./middleware/rate-limiter');
const { errorLogger, errorResponseMapper, defaultErrorResponse } = require('./middleware/errors');
const { forceSsl } = require('./middleware');
const { getConfig } = require('./config');

function setMiddleware(app, { isProduction, isDevelopment }) {
    if (isProduction) {
        app.use(forceSsl);
        // see https://expressjs.com/en/guide/behind-proxies.html
        app.set('trust proxy', 1);
        app.use('/api', limiter);
        app.use(morgan('combined'));
    }
    if (isDevelopment) {
        app.use(morgan('dev'));
    }
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(require('./middleware/logger'));
}

function setApi(app, { fccOptions }) {
    app.use('/api/timestamp', require('./controllers/timestamp'));
    app.use('/api/whoami', cors(fccOptions), require('./controllers/whoami'));
    app.use('/api/shorturl', cors(fccOptions), require('./controllers/urlShortener'));
    app.use('/api/quote', require('./controllers/quote'));
}

function setView(app, { staticsFolder }) {
    app.get(/projects\/react/, (req, res) => {
        res.sendFile(path.join(staticsFolder, '/react-projects/index.html'));
    });
    app.use(history({ verbose: true }));
    app.use(express.static(staticsFolder));
    app.get('/index.html', (req, res) => {
        res.sendFile(path.join(staticsFolder, '/landing/index.html'));
    });
}

function setErrors(app) {
    app.use(errorLogger);
    app.use(errorResponseMapper);
    app.use(defaultErrorResponse);
}

module.exports = function setupApp(app) {
    const config = getConfig();

    setMiddleware(app, config);
    setApi(app, config);
    setView(app, config);
    setErrors(app, config);
};
