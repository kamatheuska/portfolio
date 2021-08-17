import createRequest, { request } from '@/request';
import { FAKE_BASE_URL, FAKE_API_URL, FAKE_API_RESPONSE } from '../constants';
import fetchMock from '../mocks/fetch';

let result;

const args = {
    url: FAKE_API_URL,
};

describe('🌳  request module', () => {
    global.fetch = fetchMock();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('🌴 #request', () => {
        it('🌱 should return a function', () => {
            result = request(args);
            expect(typeof result).toBe('function');
        });

        describe('🍉 calling the function', () => {
            beforeEach(async () => {
                fetch.mockReturnValue(FAKE_API_RESPONSE);
                result = await request(args)(FAKE_BASE_URL);
            });
            it('🌱 should return a function that returns an api response', () => {
                expect(result).toStrictEqual(FAKE_API_RESPONSE);
            });
            it('🌱 should call fetch', () => {
                expect(result).toBe(FAKE_API_RESPONSE);
            });
        });

        describe('🍉 parameters', () => {
            let customArgs;
            it('🌱 should call fetch with the parameters passed', async () => {
                customArgs = {
                    ...args,
                    body: {
                        foo: 'bar',
                    },
                    method: 'POST',
                };
                fetch.mockReturnValue(FAKE_API_RESPONSE);
                result = await request(customArgs)(FAKE_BASE_URL);

                expect(fetch).toHaveBeenCalled();
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(fetch).toHaveBeenCalledWith(`${FAKE_BASE_URL}${FAKE_API_URL}`, {
                    method: customArgs.method,
                    body: customArgs.body,
                    headers: {},
                });
            });

            it('🌱 should call a GET method when no method has been passed', async () => {
                customArgs = {
                    ...args,
                    body: {
                        foo: 'bar',
                    },
                };
                fetch.mockReturnValue(FAKE_API_RESPONSE);
                result = await request(customArgs)(FAKE_BASE_URL);

                expect(fetch).toHaveBeenCalled();
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(fetch).toHaveBeenCalledWith(`${FAKE_BASE_URL}${FAKE_API_URL}`, {
                    method: 'GET',
                    body: customArgs.body,
                    headers: {},
                });
            });
        });
    });

    describe('🌴 #createRequest', () => {
        const requestMock = jest.fn();
        const fectchResponse = 'foo';

        it('🌱 should return a function', () => {
            requestMock.mockReturnValue(() => {});
            result = createRequest(FAKE_BASE_URL, { requestFn: requestMock });
            expect(typeof result).toBe('function');
            expect(requestMock).toHaveBeenCalled();
        });

        it('🌱 returns a curried function that returns a resolved promise value', async () => {
            requestMock.mockReturnValue(() => Promise.resolve(fectchResponse));
            const curried = createRequest(FAKE_BASE_URL, { requestFn: requestMock });
            expect(requestMock).toHaveBeenCalled();

            result = await curried(args);
            expect(result).toBe(fectchResponse);
        });

        it('🌱 returned curried function is called with passed argument', async () => {
            requestMock.mockReturnValue(() => Promise.resolve(fectchResponse));
            createRequest(FAKE_BASE_URL, { requestFn: requestMock });
            expect(requestMock).toHaveBeenCalled();
            expect(requestMock).toHaveBeenCalledWith(FAKE_BASE_URL);
        });
    });
});
