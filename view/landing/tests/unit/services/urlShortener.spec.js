import { createShortUrl } from '@/services/urlShortener';
import { buildShortUrlBody } from '@/utils/urlShortener';
import { VALID_HOSTNAME, SHORT_URL, VALID_HREF, URL_TO_BE_SHORTENED } from '@/constants/stubs';
import request from '@/request';

jest.mock('@/utils/urlShortener');
jest.mock('@/request');

let result;
const baseUrl = '/api/shorturl/';
const bodyMock = {
    url: URL_TO_BE_SHORTENED,
};
const responseMock = {
    ...bodyMock,
    shorUrl: SHORT_URL,
    href: VALID_HREF,
};

describe('urlShortener Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('🌴 #createShortUrl', () => {
        beforeEach(async () => {
            buildShortUrlBody.mockImplementation(() => bodyMock);
            request.mockImplementation(() => Promise.resolve(responseMock));

            result = await createShortUrl(VALID_HOSTNAME);
        });

        it('🌱 returns a correct response object', () => {
            expect(result).toStrictEqual(responseMock);
        });

        it('🌱 call buildShortUrlBody', async () => {
            expect(buildShortUrlBody).toHaveBeenCalled();
            expect(buildShortUrlBody).toHaveBeenCalledWith(VALID_HOSTNAME);
        });

        it('🌱 call request', async () => {
            expect(request).toHaveBeenCalled();
            expect(request).toHaveBeenCalledWith({
                baseUrl,
                body: bodyMock,
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                url: 'new',
            });
        });
    });
});
