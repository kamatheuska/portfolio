jest.mock('../../utils/url');
jest.mock('../../services/urlShortener');

const { createUrl, getUrl } = require('../urlShortener');
const {
    buildNewShortUrl,
    checkHostnameValidity,
    saveUrl,
    createUrlObject,
    getUrlById,
} = require('../../services/urlShortener');

const { getHostNameFromUrl } = require('../../utils/url');
const { VALID_HOSTNAME } = require('../../constants/stubs');

let res;
let req;
let nextMock;
let sendMock;
let redirectMock;
const logInfoMock = jest.fn();
const url = {
    original: VALID_HOSTNAME,
    short: '/short/url',
};

describe('🌳  UrlShortener Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('🌴 createUrl', () => {
        describe('🍉 when no error happens', () => {
            beforeEach(() => {
                sendMock = jest.fn();
                res = { send: sendMock, locals: { logInfo: logInfoMock } };
                req = { body: { url: VALID_HOSTNAME } };
                nextMock = jest.fn();

                getHostNameFromUrl.mockImplementation(() => VALID_HOSTNAME);
                checkHostnameValidity.mockImplementation(() => Promise.resolve());
                buildNewShortUrl.mockImplementation(() => Promise.resolve(url));
                saveUrl.mockImplementation(() => Promise.resolve(url));
                createUrlObject.mockImplementation(() => url);

                createUrl(req, res, nextMock);
            });

            it('🌱 calls getHostNameFromUrl', () => {
                expect(getHostNameFromUrl).toHaveBeenCalled();
                expect(getHostNameFromUrl).toHaveBeenCalledWith(req.body.url);
            });

            it('🌱 calls checkHostnameValidity', () => {
                expect(checkHostnameValidity).toHaveBeenCalled();
                expect(checkHostnameValidity).toHaveBeenCalledWith(VALID_HOSTNAME);
            });

            it('🌱 calls buildNewShortUrl', () => {
                expect(buildNewShortUrl).toHaveBeenCalled();
                expect(buildNewShortUrl).toHaveBeenCalledWith(VALID_HOSTNAME);
            });

            it('🌱 calls saveUrl', () => {
                expect(saveUrl).toHaveBeenCalled();
                expect(saveUrl).toHaveBeenCalledWith(url);
            });

            it('🌱 calls createUrlObject', () => {
                expect(createUrlObject).toHaveBeenCalled();
                expect(createUrlObject).toHaveBeenCalledWith(url, VALID_HOSTNAME);
            });

            it('🌱 should call res.send', () => {
                expect(sendMock).toHaveBeenCalled();
                expect(sendMock).toHaveBeenCalledTimes(1);
            });
        });

        describe('🍉 when an error happens', () => {
            const error = new Error('Mocked Error');

            beforeEach(() => {
                res = { locals: { logInfo: logInfoMock } };
                req = { body: { url: VALID_HOSTNAME } };
                nextMock = jest.fn();

                getHostNameFromUrl.mockImplementation(() => VALID_HOSTNAME);
                checkHostnameValidity.mockImplementation(() => Promise.reject(error));

                createUrl(req, res, nextMock);
            });
            it('🌱 calls next when an error is thrown', () => {
                expect(nextMock).toHaveBeenCalled();
                expect(nextMock).toHaveBeenCalledTimes(1);
                expect(nextMock).toHaveBeenCalledWith(error);
            });
        });
    });

    describe('🌴 getUrl', () => {
        describe('🍉 when no error happens', () => {
            beforeEach(() => {
                redirectMock = jest.fn();
                res = { redirect: redirectMock, locals: { logInfo: logInfoMock } };
                req = { params: { id: 'some id' } };
                nextMock = jest.fn();

                getUrlById.mockImplementation(() =>
                    Promise.resolve({
                        original: VALID_HOSTNAME,
                    }),
                );

                getUrl(req, res, nextMock);
            });

            it('🌱 calls getUrlById', () => {
                expect(getUrlById).toHaveBeenCalled();
                expect(getUrlById).toHaveBeenCalledWith(req.params.id);
            });

            it('🌱 should call res.redirect', () => {
                expect(redirectMock).toHaveBeenCalled();
                expect(redirectMock).toHaveBeenCalledTimes(1);
                expect(redirectMock).toHaveBeenCalledWith(302, VALID_HOSTNAME);
            });
        });

        describe('🍉 when an error happens', () => {
            const error = new Error('Mocked Error');

            beforeEach(() => {
                res = { locals: { logInfo: logInfoMock } };
                req = { body: { url: VALID_HOSTNAME } };
                nextMock = jest.fn();

                getHostNameFromUrl.mockImplementation(() => VALID_HOSTNAME);
                checkHostnameValidity.mockImplementation(() => Promise.reject(error));

                createUrl(req, res, nextMock);
            });
            it('🌱 calls next when an error is thrown', () => {
                expect(nextMock).toHaveBeenCalled();
                expect(nextMock).toHaveBeenCalledTimes(1);
                expect(nextMock).toHaveBeenCalledWith(error);
            });
        });
    });
});
