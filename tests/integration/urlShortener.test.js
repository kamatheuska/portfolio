process.env.NODE_ENV = 'test';
process.env.DEBUG_MODE = 'false';

import request from 'supertest';
import { jest } from '@jest/globals';

import Url from '../../model/Url';
import urlMocks from '../mocks/url';
import { app, init, stopServer } from '../../app';
import { setupDB } from './test_setup';
import { VALID_HOSTNAME, INVALID_HOSTNAME } from '../constants';

const BASE_URL = '/api/shorturl';

const seedUrls = async () => {
    try {
        await Url.insertMany(urlMocks);
    } catch (error) {
        console.error(error);
    }
};

jest.setTimeout(150000);

describe('🌳  Integration: Url Shortener', () => {
    setupDB(seedUrls, init, stopServer);

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

    describe(`🌴 POST ${BASE_URL}/new`, () => {
        it('🌱 should return a short url object', async () => {
            const url = `${BASE_URL}/new`;
            const response = await request(app).post(url).send({ url: VALID_HOSTNAME });

            expect(response.status).toBe(200);
            expect(response.body.href).toMatch(/\/api\/shorturl/);
            expect(response.body.originalUrl).toBe(VALID_HOSTNAME);
        });

        it('🌱 should return a 400 if the url is invalid', async () => {
            const url = `${BASE_URL}/new`;
            const response = await request(app).post(url).send({ url: INVALID_HOSTNAME });

            expect(response.status).toBe(400);
        });

        it('🌱 should return a 400 if no url is provided', async () => {
            const url = `${BASE_URL}/new`;
            const response = await request(app).post(url).send();

            expect(response.status).toBe(400);
        });
    });
});
