import { test, describe, assert, beforeEach, afterEach } from 'vitest';
import { build } from '../../../helpers.js';

describe('Whoami', () => {
    let app;

    beforeEach(async () => {
        app = await build();
    });

    afterEach(async () => {
        app.close.bind(app);
    });

    test('GET /projects/apis/whoami', async () => {
        try {
            const response = await app.inject({
                method: 'GET',
                url: '/projects/apis/whoami/api/whoami',
                headers: {
                    'accept-language': 'es',
                },
            });

            const body = JSON.parse(response.body);
            assert.equal(
                response.statusCode,
                200,
                'returns a status code of 200',
            );
            assert.equal(
                response.headers['content-type'],
                'application/json; charset=utf-8',
                'returns content type application/json',
            );
            assert.equal(
                body.ipaddress,
                '127.0.0.1',
                'should return ipaddress of "127.0.0.1"',
            );

            assert.equal(body.language, 'es', 'should return language of "es"');

            assert.equal(
                typeof body.software,
                'string',
                'should return software of type "string"',
            );
        } catch (error) {
            console.error(error);
        }
    });
});
