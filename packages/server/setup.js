const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const history = require('connect-history-api-fallback');
const morgan = require('morgan');
const path = require('path');

const limiter = require('./middleware/rate-limiter');
const { errorLogger, errorResponseMapper, defaultErrorResponse } = require('./middleware/errors');
const { forceSsl } = require('./middleware');
const { getConfig } = require('./config');
const { STAGE } = require('./constants/cookies');

function setMiddleware(app, { isProduction, isDevelopment }) {
    app.use(require('./middleware/logger'));

    if (isProduction) {
        // see https://expressjs.com/en/guide/behind-proxies.html
        app.set('trust proxy', 1);
        app.use('/api', limiter);
        app.use(morgan('combined'));
    }
    if (isDevelopment) {
        app.use(morgan('dev'));
    }

    app.use(cookieParser());
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true }));
}

function setApi(app, { fccOptions }) {
    app.use('/api/blog', require('./controllers/blog'));
    app.use('/api/quote', require('./controllers/quote'));
    app.use('/api/timestamp', require('./controllers/timestamp'));

    app.use('/api/file-analyse', cors(fccOptions), require('./controllers/file-analyse'));
    app.use('/api/shorturl', cors(fccOptions), require('./controllers/urlShortener'));
    app.use('/api/whoami', cors(fccOptions), require('./controllers/whoami'));
    app.use('/exercise-tracker', cors(fccOptions), require('./controllers/exercise-tracker'));
}

function setView(app, { staticsFolder, stage, isProduction }) {
    if (isProduction) {
        app.use(forceSsl);
    }
    app.get(/projects\/react/, (req, res) => {
        res.cookie(STAGE, stage).sendFile(path.join(staticsFolder, '/react-projects/index.html'));
    });
    app.use(history());
    app.use(express.static(staticsFolder));
    app.get('/index.html', (req, res) => {
        res.cookie(STAGE, stage).sendFile(path.join(staticsFolder, '/landing/index.html'));
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
