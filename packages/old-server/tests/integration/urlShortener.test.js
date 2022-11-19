const request = require('supertest');
const { seedUrls } = require('../seed/url');
const { urlStubs } = require('../../constants/stubs');
const { cleanDb, getApp } = require('../setup');
const { VALID_HOSTNAME, INVALID_HOSTNAME, INVALID_URL_ERROR } = require('../../constants/stubs');

const BASE_URL = '/api/shorturl';

describe.skip('🌳  Integration: Url Shortener', () => {
    beforeEach(async () => seedUrls());
    afterEach(async () => cleanDb());

    describe(`🌴 GET ${BASE_URL}/:id`, () => {
        it('🌱 should redirect to the saved short url', async () => {
            const url = `${BASE_URL}/${urlStubs[0].short}`;

            const app = getApp();

            const response = await request(app).get(url);

            expect(response.status).toBe(302);
        });
        it('🌱 should send a 400 if no url was found', async () => {
            const url = `${BASE_URL}/2123`;

            const app = getApp();

            const response = await request(app).get(url);

            expect(response.status).toBe(404);
        });
    });

    describe(`🌴 GET ${BASE_URL}/:id?json=true`, () => {
        it('🌱 returns a saved short url', async () => {
            const url = `${BASE_URL}/${urlStubs[0].short}?json=true`;

            const app = getApp();

            const response = await request(app).get(url);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                original: urlStubs[0].original,
                short: urlStubs[0].short,
            });
        });
        it('🌱 should send a 400 if no url was found', async () => {
            const url = `${BASE_URL}/2123`;

            const app = getApp();

            const response = await request(app).get(url);

            expect(response.status).toBe(404);
        });
    });

    describe(`🌴 POST ${BASE_URL}`, () => {
        it('🌱 should return a short url object', async () => {
            const app = getApp();

            const response = await request(app).post(BASE_URL).send({ url: VALID_HOSTNAME });

            expect(response.status).toBe(200);
            expect(response.body.href).toMatch(/\/api\/shorturl/);
            expect(response.body.original_url).toBe(VALID_HOSTNAME);
            expect(typeof response.body.short_url).toBe('number');
        });

        it('🌱 should return a 400 if the url is invalid', async () => {
            const app = getApp();

            const response = await request(app).post(BASE_URL).send({ url: INVALID_HOSTNAME });

            expect(response.status).toBe(400);
            expect(response.body).toEqual(INVALID_URL_ERROR);
        });

        it('🌱 should return a 400 if no url is provided', async () => {
            const app = getApp();

            const response = await request(app).post(BASE_URL).send();

            expect(response.status).toBe(400);
        });
    });
});
