jest.mock('../../../model/url');

const mongoose = require('mongoose');
const {
    checkHostnameValidity,
    buildNewShortUrl,
    saveUrl,
    createUrlObject,
} = require('../../../services/urlShortener');
const {
    VALID_HOSTNAME,
    VALID_URL,
    INVALID_HOSTNAME,
    URL_DOCS_COUNT,
    urlDoc,
} = require('../../constants');
const { logJestError } = require('../../utils');
const { RequestParamException, Exception } = require('../../../services/exceptions');
const Url = require('../../../model/url');

let result;

describe('🌳 UrlShortener Service', () => {
    beforeEach(() => {
        Url.mockClear();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe('🌴 checkHostnameValidity', () => {
        it('🌱 should return true when hostname is valid', async () => {
            try {
                result = await checkHostnameValidity(VALID_HOSTNAME);
                expect(result).toBeTruthy();
            } catch (error) {
                logJestError(error);
            }
        });
        it('🌱 should throw an error when hostname is invalid', async () => {
            await expect(checkHostnameValidity(INVALID_HOSTNAME)).rejects.toThrowError(
                RequestParamException,
            );
        });
        it.each([[null], [false], ['']])(
            '🌱 should throw an error when hostname is "%s"',
            async (falsyValue) => {
                await expect(checkHostnameValidity(falsyValue)).rejects.toThrowError(Exception);
            },
        );
    });
    describe('🌴 buildNewShortUrl', () => {
        let mockCountUrlDocuments;
        let mockCreateUrlDoc;
        let mockCheckDatabaseUrlCount;
        beforeEach(() => {
            mockCountUrlDocuments = jest.fn().mockReturnValue(URL_DOCS_COUNT);
            mockCreateUrlDoc = jest.fn().mockReturnValue(urlDoc);
            mockCheckDatabaseUrlCount = jest.fn();

            Url.createUrlDoc = mockCreateUrlDoc;
            Url.countUrlDocuments = mockCountUrlDocuments;
            Url.checkDatabaseUrlCount = mockCheckDatabaseUrlCount;
        });

        it('🌱 should return a MongoDB Document from an URL model', async () => {
            result = await buildNewShortUrl(VALID_URL);
            expect(result.original).toBe(urlDoc.original);
            expect(result.short).toBe(urlDoc.short);
        });

        it('🌱 should call Url model static functions correctly', async () => {
            result = await buildNewShortUrl(VALID_URL);
            expect(Url.countUrlDocuments).toHaveBeenCalledWith();
            expect(Url.createUrlDoc).toHaveBeenCalledTimes(1);
            expect(Url.checkDatabaseUrlCount).toHaveBeenCalledTimes(1);
            expect(Url.createUrlDoc).toHaveBeenCalledWith({
                hostname: VALID_URL,
                count: URL_DOCS_COUNT,
            });
        });
    });

    describe('🌴 saveUrl', () => {
        let urlModelInstance;
        beforeAll(() => {
            urlModelInstance = new Url({
                original: VALID_HOSTNAME,
                short: URL_DOCS_COUNT,
            });

            jest.spyOn(Url.prototype, 'save').mockImplementation(() => urlDoc);
        });

        it('🌱 should call the url model save method correctly', async () => {
            result = await saveUrl(urlModelInstance);
            expect(urlModelInstance.save).toHaveBeenCalled();
            expect(result).toBe(urlDoc);
        });
    });

    describe('🌴 createUrlObject', () => {
        it('🌱 should return a valid url object when passed', () => {
            result = createUrlObject({ short: '1', original: VALID_URL });
            expect(result.href).toBeTruthy();
            expect(result.shortUrl).toBe('1');
            expect(result.originalUrl).toBe(VALID_URL);
        });
    });
});

// descsui;
