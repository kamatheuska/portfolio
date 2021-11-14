import UrlShortener from '@/views/mini-services/UrlShortener.vue';
import { VALID_HOSTNAME, SHORT_URL, VALID_HREF } from '@/constants/stubs';

let context;
let response;

describe('🌳  UrlShortener component', () => {
    describe('🌴 methods', () => {
        describe('🍉 onSubmit', () => {
            beforeEach(() => {
                response = {
                    href: VALID_HREF,
                    originalUrl: VALID_HOSTNAME,
                    shortUrl: SHORT_URL,
                };

                context = {
                    createShortUrl: jest.fn(),
                    form: {
                        url: VALID_HOSTNAME,
                    },
                    resultUrl: '',
                };

                context.createShortUrl.mockImplementation(() => Promise.resolve(response));

                UrlShortener.methods.onSubmit.call(context);
            });

            it('🌱 calls createShortUrl with right args', () => {
                expect(context.createShortUrl).toHaveBeenCalled();
                expect(context.createShortUrl).toHaveBeenCalledWith(context.form.url);
            });

            it('🌱 sets response to createShortUrl return value', () => {
                expect(context.response).toEqual(response);
            });

            it('🌱 sets resultUrl to the right url', () => {
                expect(context.resultUrl).toBe(`${window.location.origin}${response.href}`);
            });
        });
    });
});
