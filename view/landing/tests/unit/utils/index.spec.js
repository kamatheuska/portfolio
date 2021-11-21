import { environments, PROD_HOSTNAME } from '@/constants/index';
import { isProd } from '@/utils/index';

let result;
describe('🌳  Utils', () => {
    describe('🌴 isProd', () => {
        it.each([
            [true, PROD_HOSTNAME, environments.PROD],
            [true, 'www.not-prod.com', environments.PROD],
            [false, 'www.not-prod.com', environments.STAGE],
        ])('🌱 returns %s if hostname=%s and env=%s', (expected, hostname, env) => {
            const windowMock = {
                location: {
                    hostname,
                },
            };
            result = isProd({ globalWindow: windowMock, hostname, env });
            expect(result).toBe(expected);
        });
    });
});
