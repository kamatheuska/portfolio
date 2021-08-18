import { buildShortUrlBody } from '@/utils/urlShortener';
import { FAKE_BASE_URL } from '../../constants';

let result;

describe('🌳  Utils UrlShortener', () => {
    describe('🌴 #buildShortUrlBody', () => {
        it('🌱 should return a JSON string with an url object', () => {
            result = buildShortUrlBody(FAKE_BASE_URL);
            const expectParsedObject = {
                url: FAKE_BASE_URL,
            };
            expect(result).toBeDefined();
            expect(JSON.parse(result)).toStrictEqual(expectParsedObject);
        });
        it('🌱 should return null if argument passed is not a string', () => {
            result = buildShortUrlBody(['not a string']);
            expect(result).toBeNull();
        });
    });
});
