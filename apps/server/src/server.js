'use strict';

import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import Fastify from 'fastify';
import closeWithGrace from 'close-with-grace';

import appService from './app.js';
import { stdSerializers } from 'pino';

const app = Fastify({
    logger: {
        level: process.env.LOG_LEVEL,
        transport: {
            target: 'pino-pretty',
        },
        serializers: {
            req(req) {
                return stdSerializers.req(req);
            },
            res(res) {
                return {
                    ...stdSerializers.res(res),
                    method: res.request.method,
                    url: res.request.url,
                    statusCode: res.statusCode,
                };
            },
        },
    },
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

const options = {
    port: process.env.PORT || 3000,
    host: process.env.SERVER_HOST || '0.0.0.0',
};

app.listen(options, err => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});
