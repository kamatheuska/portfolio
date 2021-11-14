import request from '@/request';
import { BASE_URL_STUB, API_URL_STUB, apiResponseBodyStub } from '@/constants/stubs';

let result;

const requestArgs = {
    url: API_URL_STUB,
    baseUrl: BASE_URL_STUB,
    body: apiResponseBodyStub,
    method: 'POST',
};

const jsonMock = jest.fn();
const fetchMock = jest.fn().mockImplementation(() =>
    Promise.resolve({
        json: jsonMock,
    }),
);

describe('🌳  request module', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        global.fetch = fetchMock;
        jsonMock.mockImplementation(() => Promise.resolve(apiResponseBodyStub));
    });

    describe('🌴 #request', () => {
        describe('🍉 with default arguments', () => {
            beforeEach(async () => {
                result = await request();
            });

            it('🌱 should return an api response', () => {
                expect(result).toEqual(apiResponseBodyStub);
            });

            it('🌱 calls fetch with default values', () => {
                expect(fetchMock).toHaveBeenCalledWith('/api', {
                    headers: {},
                    method: 'GET',
                });
            });

            it('🌱 calls json()', () => {
                expect(fetchMock).toHaveBeenCalled();
            });
        });
    });

    describe('🍉 with optional arguments', () => {
        it('🌱 calls fetch with optional values', async () => {
            const fullUrl = `${BASE_URL_STUB}${API_URL_STUB}`;

            result = await request(requestArgs);

            expect(fetchMock).toHaveBeenCalledWith(fullUrl, {
                body: requestArgs.body,
                method: requestArgs.method,
                headers: {},
            });
        });
    });
});
