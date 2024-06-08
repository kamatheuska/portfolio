/* eslint-disable camelcase */
import tape from 'tape';
import { build } from '../../../helpers.js';

const { test } = tape;

async function populate(app, payload) {
    const response = await app.inject({
        method: 'POST',
        url: '/projects/apis/shorturl/api/shorturl',
        payload,
    });

    return response;
}

test('GET /short/:shortUrl', async t => {
    let populateResponse;
    const app = await build();
    const payload = {
        url: 'https://github.com/fastify/light-my-request',
    };

    t.teardown(async () => {
        try {
            await app.mongoose.models.ShortUrl.deleteMany({});
            await app.close();
        } catch (error) {
            t.error(error);
        }
    });

    try {
        populateResponse = await populate(app, payload);
    } catch (error) {
        t.error(error);
    }

    try {
        const { short_url } = JSON.parse(populateResponse.body);
        const response = await app.inject({
            method: 'GET',
            url: `/projects/apis/shorturl/api/shorturl/${short_url}`,
        });

        t.equal(
            response.statusCode,
            302,
            'should return a redirect status code of 302',
        );
        t.equal(
            response.headers.location,
            payload.url,
            'should have a location header equal to populate',
        );
    } catch (error) {
        t.error(error);
    }
});

test('POST /projects/apis/shorturl', async t => {
    const app = await build();
    const payload = {
        url: 'https://github.com/fastify/light-my-request',
    };

    t.teardown(async () => {
        try {
            await app.mongoose.models.ShortUrl.deleteMany({});
            await app.close();
        } catch (error) {
            t.error(error);
        }
    });

    try {
        const response = await app.inject({
            method: 'POST',
            url: '/projects/apis/shorturl/api/shorturl',
            payload,
        });

        const body = response.json();

        t.equal(response.statusCode, 200, 'returns a status code of 200');
        t.equal(
            response.headers['content-type'],
            'application/json; charset=utf-8',
            'returns content type application/json',
        );
        t.equal(
            body.original_url,
            payload.url,
            'should return an "original_url" prop with the same value sended as "url"',
        );
        t.equal(
            typeof body.short_url,
            'string',
            'should return a "short_url" prop type "string"',
        );
    } catch (error) {
        t.error(error);
    }
});

test('POST /projects/apis/shorturl: invalid url', async t => {
    const app = await build();
    const payload = {
        url: 'ftp:/john-doe.invalidTLD',
    };

    t.teardown(async () => {
        try {
            await app.mongoose.models.ShortUrl.deleteMany({});
            await app.close();
        } catch (error) {
            t.error(error);
        }
    });

    try {
        const response = await app.inject({
            method: 'POST',
            url: '/projects/apis/shorturl/api/shorturl',
            payload,
        });

        const body = response.json();

        t.equal(response.statusCode, 200, 'returns a status code of 200');
        t.equal(
            response.headers['content-type'],
            'application/json; charset=utf-8',
            'returns content type application/json',
        );
        t.equal(
            body.error,
            'invalid url',
            'should return an "error" prop equal to "invalid url"',
        );
    } catch (error) {
        t.error(error);
    }
});
