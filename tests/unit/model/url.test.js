const { VALID_HOSTNAME, VALID_URL, URL_DOCS_COUNT } = require('../../constants');

const {
    savePreSchemaHook,
    countUrlDocuments,
    checkDatabaseUrlCount,
} = require('../../../model/url/functions');
const { addHttp } = require('../../../utils/url'); // eslint-disable-line
const { getConfig } = require('../../../config'); // eslint-disable-line
const { isLessThanOrThrow } = require('../../../utils/errors'); // eslint-disable-line

jest.mock('../../../utils/url');
jest.mock('../../../utils/errors');
jest.mock('../../../model/url');
jest.mock('../../../config');

let subject;
let result;
let mockMongooseExec;

function Url() {
    this.original = VALID_HOSTNAME;
}

describe('🌳  Url Model', () => {
    beforeEach(() => {
        mockMongooseExec = jest.fn(() => Promise.resolve(URL_DOCS_COUNT));
        Url.prototype.savePreSchemaHook = savePreSchemaHook;
        Url.prototype.countUrlDocuments = countUrlDocuments;
        Url.prototype.checkDatabaseUrlCount = checkDatabaseUrlCount;
        Url.prototype.estimatedDocumentCount = () => ({
            exec: mockMongooseExec,
        });
        subject = new Url();
    });

    describe('🌴 Statics', () => {
        describe('🍉 savePreSchemaHook', () => {
            it('🌱 should add http protocol to the original property in the model if not present', () => {
                addHttp.mockImplementation(() => VALID_URL);

                subject.savePreSchemaHook();
                expect(subject.original).toBe(VALID_URL);
            });
        });
        describe('🍉 countUrlDocuments', () => {
            it('🌱 return a count of how many url documents there are in the DB', async () => {
                addHttp.mockImplementation(() => VALID_URL);
                getConfig.mockImplementation(() => ({ db: { url: { documentLimit: 30 } } }));

                result = await subject.countUrlDocuments();
                expect(result).toBe(URL_DOCS_COUNT);
            });
        });

        describe('🍉 checkDatabaseUrlCount', () => {
            const count = URL_DOCS_COUNT + 10;
            const errorMessage =
                'Database capacity limit reached. Please contact the administrator.';
            beforeEach(() => {
                isLessThanOrThrow.mockImplementation(() => {
                    throw new Error();
                });
                getConfig.mockImplementation(() => ({
                    db: { url: { documentLimit: URL_DOCS_COUNT } },
                }));
            });

            it('🌱 should thow an error if the db limit is passed', async () => {
                expect(() => checkDatabaseUrlCount(count)).toThrow();
            });

            it('🌱 calls isLessThanOrThrow', () => {
                expect(() => checkDatabaseUrlCount(count)).toThrow();
                expect(isLessThanOrThrow).toHaveBeenCalled();
                expect(isLessThanOrThrow).toHaveBeenCalledWith(URL_DOCS_COUNT, count, {
                    errorMessage,
                });
            });
        });
    });
});
