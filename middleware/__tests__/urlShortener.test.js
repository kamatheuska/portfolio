jest.mock('../../utils/errors');
jest.mock('../../utils');
jest.mock('../../utils/errors');
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
const { toBoolean } = require('../../utils');

const { getHostNameFromUrl } = require('../../utils/url');
const { VALID_HOSTNAME, INVALID_URL_ERROR } = require('../../constants/stubs');
const { isInvalidRequestException } = require('../../utils/errors');
const { RequestParamException } = require('../../services/exceptions');

let res;
let req;
let nextMock;
let sendMock;
let redirectMock;
let logInfoMock;
let statusMock;

const url = {
    original: VALID_HOSTNAME,
    short: '/short/url',
};

describe('🌳  UrlShortener Middleware', () => {
    beforeEach(() => {
        logInfoMock = jest.fn();
        statusMock = jest.fn();
        sendMock = jest.fn();
        nextMock = jest.fn();
        redirectMock = jest.fn();

        jest.clearAllMocks();
    });

    describe('🌴 createUrl', () => {
        describe('🍉 when no error happens', () => {
            beforeEach(async () => {
                res = {
                    status: statusMock,
                    send: sendMock,
                    locals: { logInfo: logInfoMock },
                };
                req = { body: { url: VALID_HOSTNAME } };

                getHostNameFromUrl.mockImplementation(() => VALID_HOSTNAME);
                checkHostnameValidity.mockImplementation(() => Promise.resolve());
                buildNewShortUrl.mockImplementation(() => Promise.resolve(url));
                saveUrl.mockImplementation(() => Promise.resolve(url));
                createUrlObject.mockImplementation(() => url);

                await createUrl(req, res, nextMock);
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

            it('🌱 should not call next', () => {
                expect(nextMock).not.toHaveBeenCalled();
            });
        });

        describe('🍉 when an error happens', () => {
            const errorMessage = 'Mocked Error';
            let error = new RequestParamException(errorMessage);

            beforeEach(() => {
                res = {
                    send: sendMock,
                    status: statusMock,
                    locals: { logInfo: logInfoMock },
                };
                req = { body: { url: VALID_HOSTNAME } };

                statusMock.mockImplementation(() => res);
                getHostNameFromUrl.mockImplementation(() => VALID_HOSTNAME);
            });

            it('🌱 calls next when an error is thrown and is not a RequestParamException', async () => {
                error = new Error('Some Error');
                checkHostnameValidity.mockImplementation(() => Promise.reject(error));
                isInvalidRequestException.mockImplementation(() => false);

                await createUrl(req, res, nextMock);

                expect(nextMock).toHaveBeenCalled();
                expect(nextMock).toHaveBeenCalledTimes(1);
                expect(nextMock).toHaveBeenCalledWith(error);
            });

            it('🌱 calls res.send when an error is thrown', async () => {
                checkHostnameValidity.mockImplementation(() => Promise.reject(error));
                isInvalidRequestException.mockImplementation(() => true);

                await createUrl(req, res, nextMock);

                expect(sendMock).toHaveBeenCalled();
                expect(sendMock).toHaveBeenCalledTimes(1);
                expect(sendMock).toHaveBeenCalledWith(INVALID_URL_ERROR);
            });

            it('🌱 calls res.status when an error is thrown', async () => {
                checkHostnameValidity.mockImplementation(() => Promise.reject(error));
                isInvalidRequestException.mockImplementation(() => true);

                await createUrl(req, res, nextMock);
                expect(statusMock).toHaveBeenCalled();
                expect(statusMock).toHaveBeenCalledWith(400);
            });
        });
    });

    describe('🌴 getUrl', () => {
        describe('🍉 when a json query parameter is not present', () => {
            beforeEach(() => {
                res = { redirect: redirectMock, locals: { logInfo: logInfoMock } };
                req = { params: { id: 10 }, query: {} };

                toBoolean.mockImplementation(() => false);
            });

            describe('🌴 and no error happens', () => {
                beforeEach(async () => {
                    getUrlById.mockImplementation(() =>
                        Promise.resolve({
                            original: VALID_HOSTNAME,
                        }),
                    );

                    await getUrl(req, res, nextMock);
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

                it('🌱 should not call next', () => {
                    expect(nextMock).not.toHaveBeenCalled();
                });
            });

            describe('🌴 and an error happens', () => {
                const error = new Error('Mocked Error');

                beforeEach(async () => {
                    getUrlById.mockImplementation(() => Promise.reject(error));

                    await getUrl(req, res, nextMock);
                });

                it('🌱 calls next when an error is thrown', () => {
                    expect(nextMock).toHaveBeenCalled();
                    expect(nextMock).toHaveBeenCalledTimes(1);
                    expect(nextMock).toHaveBeenCalledWith(error);
                });
            });
        });
        describe('🍉 when a json query parameter is equal to true', () => {
            beforeEach(() => {
                res = {
                    send: sendMock,
                    redirect: redirectMock,
                    locals: { logInfo: logInfoMock },
                };
                req = { params: { id: 10 }, query: { json: 'true' } };

                toBoolean.mockImplementation(() => true);
            });

            describe('🌴 and no error happens', () => {
                beforeEach(async () => {
                    getUrlById.mockImplementation(() =>
                        Promise.resolve({
                            original: VALID_HOSTNAME,
                            short: '2',
                        }),
                    );

                    await getUrl(req, res, nextMock);
                });

                it('🌱 calls getUrlById', () => {
                    expect(getUrlById).toHaveBeenCalled();
                    expect(getUrlById).toHaveBeenCalledWith(req.params.id);
                });

                it('🌱 calls toBoolean with req.query.json', async () => {
                    expect(toBoolean).toHaveBeenCalled();
                    expect(toBoolean).toHaveBeenCalledTimes(1);
                    expect(toBoolean).toHaveBeenCalledWith(req.query.json);
                });

                it('🌱 calls res.send with right payload', async () => {
                    expect(sendMock).toHaveBeenCalled();
                    expect(sendMock).toHaveBeenCalledTimes(1);
                    expect(sendMock).toHaveBeenCalledWith({
                        original: VALID_HOSTNAME,
                        short: '2',
                    });
                });

                it('🌱 should not call next', () => {
                    expect(nextMock).not.toHaveBeenCalled();
                });
            });

            describe('🌴 and an error happens', () => {
                const error = new Error('Mocked Error');

                beforeEach(async () => {
                    getUrlById.mockImplementation(() => Promise.reject(error));

                    await getUrl(req, res, nextMock);
                });

                it('🌱 calls next when an error is thrown', () => {
                    expect(nextMock).toHaveBeenCalled();
                    expect(nextMock).toHaveBeenCalledTimes(1);
                    expect(nextMock).toHaveBeenCalledWith(error);
                });
            });
        });
    });
});
