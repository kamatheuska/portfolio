const request = require('supertest');
const { getApp } = require('../setup');

const BASE_URL = '/api/timestamp';

describe('🌳  Integration: Quotes', () => {
    let response;
    let url;

    describe(`🌴 GET ${BASE_URL}`, () => {
        it('🌱 should return a generated timestamp', async () => {
            const app = getApp();

            url = `${BASE_URL}`;

            response = await request(app).get(url);
            expect(response.status).toBe(200);
            expect(typeof response.body.unix).toBe('number');
            expect(typeof response.body.utc).toBe('string');
        });
    });

    describe(`🌴 GET ${BASE_URL}/:date`, () => {
        it.each([
            // expectedUnix, expectedUtc, date
            [1451001600000, 'Fri, 25 Dec 2015 00:00:00 GMT', '1451001600000'],
            [819203040000, 'Sun, 17 Dec 1995 12:24:00 GMT', 'December%2017,%201995%2013:24:00'],
            [819203040000, 'Sun, 17 Dec 1995 12:24:00 GMT', 'December 17, 1995 13:24:00'],
        ])(
            '🌱 should return a generated timestamp with unix=%s and utc=%s when date=%s',
            async (expectedUnix, expectedUtc, date) => {
                const app = getApp();

                url = `${BASE_URL}/${date}`;

                response = await request(app).get(url);
                expect(response.status).toBe(200);
                expect(response.body.unix).toBe(expectedUnix);
                expect(response.body.utc).toBe(expectedUtc);
            },
        );
    });
});
