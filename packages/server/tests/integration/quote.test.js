const request = require('supertest');
const { getApp } = require('../setup');

const BASE_URL = '/api/quote';
let response;
let url;

describe('🌳  Integration: Quotes', () => {
    describe(`🌴 GET ${BASE_URL}?random=true`, () => {
        it('🌱 should return a random quote', async () => {
            debugger;
            const app = getApp();
            url = `${BASE_URL}?random=true`;

            response = await request(app).get(url);
            expect(response.status).toBe(200);
            expect(response.body.quote).toBeDefined();
            expect(response.body.quote.author).toBeDefined();
            expect(response.body.quote.text).toBeDefined();
        });

        it('🌱 should send a 404 if no random flag is passed', async () => {
            const app = getApp();
            url = `${BASE_URL}`;
            response = await request(app).get(url);

            expect(response.status).toBe(404);
        });
    });
});
