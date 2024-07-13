'use strict';

import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import Fastify from 'fastify';
import closeWithGrace from 'close-with-grace';

import appService from './app.js';
import { stdSerializers } from 'pino';

const logger = {
    level: process.env.LOG_LEVEL,
    serializers: {
        req(req) {
            return stdSerializers.req(req);
        },
        res(res) {
            return {
                ...stdSerializers.res(res),
                method: reply.request.method,
                url: reply.request.url,
                statusCode: reply.statusCode,
            };
        },
    },
};

if (process.env.NODE_ENV !== 'production') {
    logger.transport = {
        target: 'pino-pretty',
    };
}

const app = Fastify({
    logger,
});

app.register(appService);

const closeListeners = closeWithGrace(
    { delay: process.env.FASTIFY_CLOSE_GRACE_DELAY || 500 },
    async function ({ err }) {
        if (err) {
            app.log.error(err);
        }
        await app.close();
    },
);

app.addHook('onClose', async (instance, done) => {
    closeListeners.uninstall();
    done();
});

app.listen({ port: process.env.PORT || 3000 }, err => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});
