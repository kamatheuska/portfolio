import { jest } from '@jest/globals';

// jest.mock('../../../utils/errors');
// jest.mock('../../../model/Url');
// jest.mock('../../../config');

import { VALID_HOSTNAME, VALID_URL, URL_DOCS_COUNT } from '../../constants';
// import {
//     savePreSchemaHook,
//     countUrlDocuments,
//     checkDatabaseUrlCount,
// } from '../../../model/Url';
// import { getConfig } from '../../../config';
// import { isLessThanOrThrow } from '../../../utils/errors';

let subject;
let result;
let mockMongooseExec;

function Url() {
    this.original = VALID_HOSTNAME;
}

describe('🌳  Url Model', () => {
    // beforeEach(() => {
    //     mockMongooseExec = jest.fn(() => Promise.resolve(URL_DOCS_COUNT));
    //     Url.prototype.savePreSchemaHook = savePreSchemaHook;
    //     Url.prototype.countUrlDocuments = countUrlDocuments;
    //     Url.prototype.checkDatabaseUrlCount = checkDatabaseUrlCount;
    //     Url.prototype.estimatedDocumentCount = () => ({
    //         exec: mockMongooseExec,
    //     });
    //     subject = new Url();
    // });

    describe('🌴 Statics', () => {
        describe('🍉 savePreSchemaHook', () => {
            it('🌱 should add http protocol to the original property in the model if not present', () => {
                jest.mock('../../../utils/url');
                const { addHttp } = require('../../../utils/url');
                addHttp.mockImplementation(() => VALID_URL);

                subject.savePreSchemaHook();
                expect(subject.original).toBe(VALID_URL);
            });
        });
        // describe('🍉 countUrlDocuments', () => {
        //     it('🌱 return a count of how many url documents there are in the DB', async () => {
        //         addHttp.mockImplementation(() => VALID_URL);
        //         getConfig.mockImplementation(() => ({ db: { url: { documentLimit: 30 } } }));

        //         result = await subject.countUrlDocuments();
        //         expect(result).toBe(URL_DOCS_COUNT);
        //     });
        // });

        // describe('🍉 checkDatabaseUrlCount', () => {
        //     it('🌱 should thow an error if the db limit is passed', async () => {
        //         isLessThanOrThrow.mockImplementation(() => {
        //             throw new Error();
        //         });
        //         getConfig.mockImplementation(() => ({
        //             db: { url: { documentLimit: URL_DOCS_COUNT } },
        //         }));

        //         expect(() => checkDatabaseUrlCount(URL_DOCS_COUNT + 10)).toThrow();
        //     });
        // });
    });
});
