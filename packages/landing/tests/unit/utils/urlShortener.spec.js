import { BASE_URL_STUB } from '@/constants/stubs';
import { buildShortUrlBody } from '@/utils/urlShortener';

let result;

describe('🌳  Utils UrlShortener', () => {
    describe('🌴 #buildShortUrlBody', () => {
        it('🌱 should return a JSON string with an url object', () => {
            result = buildShortUrlBody(BASE_URL_STUB);
            const expectParsedObject = {
                url: BASE_URL_STUB,
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
