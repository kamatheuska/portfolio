process.env.NODE_ENV = 'test';

const request = require('supertest');
const Url = require('../../model/url');
const urlMocks = require('../mocks/url');
const { app, init, stopServer } = require('../../app');
const { setupDB } = require('./test_setup');

const BASE_URL = '/api/quote';
let response;
let url;

const seedUrls = async () => {
    try {
        await Url.insertMany(urlMocks);
    } catch (error) {
        console.error(error);
    }
};

jest.setTimeout(150000);

describe('🌳  Integration: Quotes', () => {
    setupDB({ seedAsyncDatabaseCallback: seedUrls, init, stopServer });

    describe(`🌴 GET ${BASE_URL}?random=true`, () => {
        it('🌱 should return a random quote', async () => {
            url = `${BASE_URL}?random=true`;

            response = await request(app).get(url);
            expect(response.status).toBe(200);
            expect(response.body.quote).toBeDefined();
            expect(response.body.quote.author).toBeDefined();
            expect(response.body.quote.text).toBeDefined();
        });
        it('🌱 should send a 404 if no random flag is passed', async () => {
            url = `${BASE_URL}`;
            response = await request(app).get(url);

            expect(response.status).toBe(404);
        });
    });
});
