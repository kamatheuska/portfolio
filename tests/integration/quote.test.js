const request = require('supertest');
const { teardown, setupTests } = require('../setup');

const BASE_URL = '/api/quote';
let response;
let url;
let createdApp;
let createdServer;

describe('🌳  Integration: Quotes', () => {
    beforeAll(async () => {
        try {
            const { app, server } = await setupTests();

            createdApp = app;
            createdServer = server;
        } catch (error) {
            console.error(error);
        }
    });

    afterAll(async () => teardown(createdServer));

    describe(`🌴 GET ${BASE_URL}?random=true`, () => {
        it('🌱 should return a random quote', async () => {
            url = `${BASE_URL}?random=true`;

            response = await request(createdApp).get(url);
            expect(response.status).toBe(200);
            expect(response.body.quote).toBeDefined();
            expect(response.body.quote.author).toBeDefined();
            expect(response.body.quote.text).toBeDefined();
        });
        it('🌱 should send a 404 if no random flag is passed', async () => {
            url = `${BASE_URL}`;
            response = await request(createdApp).get(url);

            expect(response.status).toBe(404);
        });
    });
});
