import express from 'express';
import path from 'path';
import morgan from 'morgan';
import { URL } from 'url';

import { initConfig, getConfig } from './config';
import { connectToDatabase, disconnectFromDatabase } from './db';
import { errorLogger, errorResponseMapper, defaultErrorResponse } from './middleware/errors';
import { logInfo } from './services/logger';


let config, server;

// https://stackoverflow.com/a/66651120/7868769
const dirname = new URL('.', import.meta.url).pathname;
export const app = express();

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

export function startServer() {
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

    app.use(express.static(path.join(dirname, 'public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(() => import('./middleware/logger'));

    app.use('/api/shorturl/', () => import('./controllers/urlShortener'));
    app.use('/api/quote/', () => import('./controllers/quote'));

    app.get('/', (req, res) => {
        res.sendFile(path.join(dirname, '/index.html'));
    });

    app.use(errorLogger);
    app.use(errorResponseMapper);
    app.use(defaultErrorResponse);
}

export async function init() {
    initializeConfiguration();
    await connectToDatabase();
    registerControllers();
    server = startServer();
}

