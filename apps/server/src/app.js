import Env from '@fastify/env';
import S from 'fluent-json-schema';
import Sensible from '@fastify/sensible';
import Autoload from '@fastify/autoload';
import Multipart from '@fastify/multipart';
import FormBody from '@fastify/formbody';
// import helmet from '@fastify/helmet';
import cors from '@fastify/cors';

import { join } from './utils/dir.js';

// Plugins
import quotes from './projects/apis/quotes/quotes.plugin.js';
import timestamp from './projects/apis/timestamp/timestamp.plugin.js';
import shortUrl from './projects/apis/shortUrl/shortUrl.plugin.js';
import fileAnalyse from './projects/apis/file-analyse/file-analyse.plugin.js';
import whoami from './projects/apis/whoami/whoami.plugin.js';

export default async function createApp(fastify, opts) {
    const envOptions = {
        schema: S.object()
            .prop('NODE_ENV', S.string().required())
            .prop('MONGODB_URI', S.string().required())
            .prop('DB_DOCUMENT_LIMIT', S.number().required().default(100))
            .valueOf(),
    };

    await fastify.register(Env, envOptions);
    await fastify.register(Sensible);
    await fastify.register(Multipart);
    await fastify.register(FormBody);

    const WHITELISTED_DOMAINS = [
        'nicolasramirez.dev',
        'portfolio-14g.pages.dev',
        'freecodecamp.org',
        'www.freecodecamp.org',
    ];

    await fastify.register(cors, {
        origin(origin, cb) {
            const { log, config } = fastify;

            if (config.NODE_ENV === 'test' || !origin) {
                cb(null, true);
                return;
            }

            log.debug(`CORS origin: ${origin}`);

            let hostname;

            try {
                const url = new URL(origin);
                hostname = url.hostname;
            } catch (error) {
                log.error(error);
            }

            if (hostname === 'localhost') {
                cb(null, true);
                return;
            }

            if (WHITELISTED_DOMAINS.includes(hostname)) {
                cb(null, true);
                return;
            }

            cb(new Error('Not allowed'), false);
        },
    });
    //   await fastify.register(helmet, {
    //     contentSecurityPolicy: false,
    //   });

    await fastify.register(Autoload, {
        dir: join(import.meta.url, 'plugins'),
        options: { ...opts },
    });

    await fastify.register(quotes);
    await fastify.register(timestamp);
    await fastify.register(shortUrl);
    await fastify.register(fileAnalyse);
    await fastify.register(whoami);
}

export const options = {
    logger: {
        development: {
            transport: {
                target: 'pino-pretty',
            },
        },
        production: true,
        test: false,
    },
};
