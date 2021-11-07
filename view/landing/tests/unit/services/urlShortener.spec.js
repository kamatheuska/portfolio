import { createShortUrl } from '@/services/urlShortener';
import { buildShortUrlBody } from '@/utils/urlShortener';
import { URL_TO_BE_SHORTENED } from '../../constants';

jest.mock('@/utils/urlShortener');

let result;

describe('urlShortener Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('🌴 #createShortUrl', () => {
        const requestMock = jest.fn();
        const mocks = { requestFn: requestMock };

        it('🌱 should return a promise', () => {
            result = createShortUrl(URL_TO_BE_SHORTENED, mocks);
            expect(typeof result.then).toBe('function');
        });
        it('🌱 should call requestMock', async () => {
            buildShortUrlBody.mockReturnValue({
                url: URL_TO_BE_SHORTENED,
            });
            await createShortUrl(URL_TO_BE_SHORTENED, mocks);
            expect(requestMock).toHaveBeenCalled();
            expect(requestMock).toHaveBeenCalledTimes(1);
        });

        it('🌱 should call requestMock with the right arguments', async () => {
            await createShortUrl(URL_TO_BE_SHORTENED, mocks);
            const mockCalls = requestMock.mock.calls[0][0];
            expect(mockCalls.method).toBe('POST');
            expect(mockCalls.url).toBe('new');
        });
    });
});
