const request = require('supertest');
const { getApp } = require('../setup');
const { ACCEPT_LANGUAGE_HEADER_STUB, USER_AGENT_HEADER_STUB } = require('../../constants/stubs');

const BASE_URL = '/api/whoami';

describe('🌳  Integration: WhoAmI', () => {
    let url;
    let response;

    describe(`🌴 GET ${BASE_URL}`, () => {
        beforeEach(async () => {
            const app = getApp();

            url = `${BASE_URL}`;

            response = await request(app)
                .get(url)
                .set('accept-language', ACCEPT_LANGUAGE_HEADER_STUB)
                .set('user-agent', USER_AGENT_HEADER_STUB);
        });

        it('🌱 should have a valid response', () => {
            expect(response.status).toBe(200);
        });

        it('🌱 body has an property ipaddress', () => {
            expect(response.body.ipaddress).toBe('::ffff:127.0.0.1');
        });

        it('🌱 body has a property language', () => {
            expect(response.body.language).toBe(ACCEPT_LANGUAGE_HEADER_STUB);
        });

        it('🌱 body has a property software', () => {
            expect(response.body.software).toBe(USER_AGENT_HEADER_STUB);
        });
    });
});
