import { test, assert, describe, afterEach } from 'vitest';
import { build } from '../../../helpers.js';

describe('Random Quotes', () => {
    let app;

    afterEach(async () => {
        if (app) {
            await app.close();
        }
    });

    test('GET /projects/apis/quotes/random', async () => {
        app = await build();

        try {
            const response = await app.inject({
                method: 'GET',
                url: '/projects/apis/quotes/random',
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
                typeof body.id,
                'string',
                'should return an "id" prop type "string"',
            );

            assert.equal(
                typeof body.text,
                'string',
                'should return an "text" prop type "string"',
            );

            assert.equal(
                typeof body.author,
                'string',
                'should return an "author" prop type "string"',
            );
        } catch (error) {
            console.error(error);
        }
    });
});
