import { describe, assert, beforeEach, afterEach, test } from 'vitest';
import { build } from '../../../helpers.js';

describe('Timestamp', () => {
    let app;

    beforeEach(async () => {
        app = await build();
    });

    afterEach(async () => {
        app.close.bind(app);
    });

    test('GET /projects/apis/timestamp', async t => {
        try {
            const response = await app.inject({
                method: 'GET',
                url: '/projects/apis/timestamp/api',
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
                typeof body.unix,
                'number',
                'returns an object with a number unix',
            );
            assert.equal(
                typeof body.utc,
                'string',
                'returns an object with a string utc',
            );
        } catch (error) {
            console.error(error);
        }
    });

    [
        {
            expectedUnix: 1451001600000,
            expectedUtc: 'Fri, 25 Dec 2015 00:00:00 GMT',
            date: '1451001600000',
        },
        {
            expectedUnix: 819203040000,
            expectedUtc: 'Sun, 17 Dec 1995 12:24:00 GMT',
            date: 'December%2017,%201995%2013:24:00',
        },
        {
            expectedUnix: 819203040000,
            expectedUtc: 'Sun, 17 Dec 1995 12:24:00 GMT',
            date: 'December 17, 1995 13:24:00',
        },
    ].forEach(({ expectedUnix, expectedUtc, date }) => {
        test(`GET /projects/apis/timestamp/api/:date when date is ${date}`, async t => {
            try {
                const response = await app.inject({
                    method: 'GET',
                    url: `/projects/apis/timestamp/api/${date}`,
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
                    body.unix,
                    expectedUnix,
                    'returns an object with a number unix',
                );
                assert.equal(
                    body.utc,
                    expectedUtc,
                    'returns an object with a string utc',
                );
            } catch (error) {
                console.error(error);
            }
        });
    });

    test('GET /projects/apis/timestamp/api/not-a-date', async t => {
        try {
            const response = await app.inject({
                method: 'GET',
                url: '/projects/apis/timestamp/api/not-a-date',
            });

            const body = JSON.parse(response.body);
            assert.equal(
                response.statusCode,
                400,
                'returns a status code of 400',
            );
            assert.equal(
                response.headers['content-type'],
                'application/json; charset=utf-8',
                'returns content type application/json',
            );
            assert.equal(body.error, 'Invalid Date', 'returns an error');
        } catch (error) {
            console.error(error);
        }
    });
});
