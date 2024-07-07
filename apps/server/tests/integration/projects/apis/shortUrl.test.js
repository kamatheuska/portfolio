/* eslint-disable camelcase */
import { beforeEach, afterEach, describe, test, assert } from 'vitest';
import { build } from '../../../helpers.js';

async function populate(app, payload) {
    const response = await app.inject({
        method: 'POST',
        url: '/projects/apis/shorturl/api/shorturl',
        payload,
    });

    return response;
}

describe('ShortURL', () => {
    let app;

    beforeEach(async () => {
        app = await build();
    });

    afterEach(async () => {
        try {
            await app.mongoose.models.ShortUrl.deleteMany({});
            await app.close();
        } catch (error) {
            assert.isNull(error);
        }
    });

    test('GET /short/:shortUrl', async () => {
        let populateResponse;
        const payload = {
            url: 'https://github.com/fastify/light-my-request',
        };

        try {
            populateResponse = await populate(app, payload);
        } catch (error) {
            assert.isNull(error);
        }

        try {
            const { short_url } = JSON.parse(populateResponse.body);
            const response = await app.inject({
                method: 'GET',
                url: `/projects/apis/shorturl/api/shorturl/${short_url}`,
            });

            assert.equal(
                response.statusCode,
                302,
                'should return a redirect status code of 302',
            );
            assert.equal(
                response.headers.location,
                payload.url,
                'should have a location header equal to populate',
            );
        } catch (error) {
            assert.isNull(error);
        }
    });

    test('POST /projects/apis/shorturl', async () => {
        const payload = {
            url: 'https://github.com/fastify/light-my-request',
        };

        try {
            const response = await app.inject({
                method: 'POST',
                url: '/projects/apis/shorturl/api/shorturl',
                payload,
            });

            const body = response.json();

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
                body.original_url,
                payload.url,
                'should return an "original_url" prop with the same value sended as "url"',
            );
            assert.equal(
                typeof body.short_url,
                'string',
                'should return a "short_url" prop type "string"',
            );
        } catch (error) {
            assert.isNull(error);
        }
    });

    test('POST /projects/apis/shorturl: invalid url', async () => {
        const payload = {
            url: 'ftp:/john-doe.invalidTLD',
        };

        try {
            const response = await app.inject({
                method: 'POST',
                url: '/projects/apis/shorturl/api/shorturl',
                payload,
            });

            const body = response.json();

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
                body.error,
                'invalid url',
                'should return an "error" prop equal to "invalid url"',
            );
        } catch (error) {
            assert.isNull(error);
        }
    });
});
