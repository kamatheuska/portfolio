process.env.NODE_ENV = 'test';
process.env.DEBUG_MODE = 'false';

const request = require('supertest');
const Url = require('../../model/url');
const { urlStubs } = require('../../constants/stubs');
const { app, init, stopServer } = require('../../app');
const { setupDB } = require('./test_setup');
const { VALID_HOSTNAME, INVALID_HOSTNAME } = require('../../constants/stubs');

const BASE_URL = '/api/shorturl';

const seedUrls = async () => {
    try {
        await Url.insertMany(urlStubs);
    } catch (error) {
        console.error(error);
    }
};

jest.setTimeout(150000);

describe('🌳  Integration: Url Shortener', () => {
    setupDB({ seedAsyncDatabaseCallback: seedUrls, init, stopServer });

    describe(`🌴 GET ${BASE_URL}/:id`, () => {
        it('🌱 should redirect to the saved short url', async () => {
            const url = `${BASE_URL}/2`;
            const response = await request(app).get(url);

            expect(response.status).toBe(302);
        });
        it('🌱 should send a 400 if no url was found', async () => {
            const url = `${BASE_URL}/2123`;
            const response = await request(app).get(url);

            expect(response.status).toBe(404);
        });
    });

    describe(`🌴 POST ${BASE_URL}`, () => {
        it('🌱 should return a short url object', async () => {
            const response = await request(app).post(BASE_URL).send({ url: VALID_HOSTNAME });

            expect(response.status).toBe(200);
            expect(response.body.href).toMatch(/\/api\/shorturl/);
            expect(response.body.original_url).toBe(VALID_HOSTNAME);
            expect(typeof response.body.short_url).toBe('number');
        });

        it('🌱 should return a 400 if the url is invalid', async () => {
            const response = await request(app).post(BASE_URL).send({ url: INVALID_HOSTNAME });

            expect(response.status).toBe(400);
        });

        it('🌱 should return a 400 if no url is provided', async () => {
            const response = await request(app).post(BASE_URL).send();

            expect(response.status).toBe(400);
        });
    });
});
