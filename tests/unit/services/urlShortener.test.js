import { jest } from '@jest/globals';

jest.mock('../../../model/Url');
jest.mock('../../../utils/errors');

import {
    checkHostnameValidity,
    buildNewShortUrl,
    saveUrl,
    createUrlObject,
} from '../../../services/urlShortener';
import {
    VALID_HOSTNAME,
    VALID_URL,
    INVALID_HOSTNAME,
    URL_DOCS_COUNT,
    urlDoc,
} from '../../constants';
import { logJestError } from '../../utils';
import { isTruthyOrThrow } from '../../../utils/errors';
import { RequestParamException, Exception } from '../../../services/exceptions';
import Url from '../../../model/Url';

let result;

describe('🌳 UrlShortener Service', () => {
    beforeEach(() => {
        // Url.mockClear();
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
            isTruthyOrThrow.mockImplementation(() => {
                throw new Error();
            });
            await expect(checkHostnameValidity(INVALID_HOSTNAME)).rejects.toThrowError(
                RequestParamException,
            );
        });
        it.each([[null], [false], ['']])(
            '🌱 should throw an error when hostname is "%s"',
            async (falsyValue) => {
                isTruthyOrThrow.mockImplementation(() => {
                    throw new Error();
                });
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
            expect(Url.createUrlDoc).toHaveBeenCalledWith(VALID_URL, URL_DOCS_COUNT);
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
            const anotherValidUrl = 'www.foo.com';
            result = createUrlObject({ short: '1', original: VALID_URL }, anotherValidUrl);
            expect(result.href).toBeTruthy();
            expect(result.shortUrl).toBe('1');
            expect(result.originalUrl).toBe(anotherValidUrl);
        });
    });
});

// descsui;
