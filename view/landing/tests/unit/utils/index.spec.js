import Cookies from 'js-cookie';
import { environments } from '@/constants/index';
import { isProd } from '@/utils/index';

jest.mock('js-cookie');

let result;
describe('🌳  Utils', () => {
    describe('🌴 isProd', () => {
        it.each([
            [true, environments.PROD],
            [false, environments.TEST],
            [false, 'foobar'],
        ])('🌱 returns %s if stage cookie=%s', (expected, stageCookie) => {
            Cookies.get.mockImplementation(() => stageCookie);
            result = isProd();
            expect(result).toBe(expected);
        });
    });
});
