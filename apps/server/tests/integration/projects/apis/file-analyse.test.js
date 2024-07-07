import fs from 'node:fs';

import FormData from 'form-data';
import { afterEach, beforeEach, describe, assert, test } from 'vitest';

import { build } from '../../../helpers.js';
import { join } from '../../../../src/utils/dir.js';

function createMockFormData(filename) {
    const form = new FormData();
    const pathToMockFile = join(
        import.meta.url,
        `../../../mocks/files/${filename}`,
    );
    const file = fs.createReadStream(pathToMockFile);

    form.append('file', file);

    return form;
}

describe('File Analyse Integration', () => {
    let app;

    beforeEach(async () => {
        app = await build();
    });

    afterEach(async () => {
        app.close.bind(app);
    });

    describe('POST /projects/apis/fileanalyse', () => {
        test('Small text file', async () => {
            const formData = createMockFormData('plain.txt');

            try {
                const response = await app.inject({
                    method: 'POST',
                    url: '/projects/apis/fileanalyse/api/fileanalyse',
                    headers: formData.getHeaders(),
                    payload: formData,
                });

                const body = JSON.parse(response.body);

                assert.equal(
                    response.statusCode,
                    200,
                    'returns a status code of 200',
                );
                assert.equal(
                    response.headers['content-type'],
                    'application/json; charset=utf-8',
                    'returns content type application/json',
                );
                assert.equal(
                    body.name,
                    'plain.txt',
                    'should return a "name" prop equal to "plain.txt"',
                );

                assert.equal(
                    body.type,
                    'text/plain',
                    'should return a type of text/plain',
                );

                assert.equal(
                    typeof body.size,
                    'string',
                    'should return an "author" prop type "string"',
                );
            } catch (error) {
                console.error(error);
            }
        });
        test('Big text file', async () => {
            const formData = createMockFormData('yarn.lock');

            try {
                const response = await app.inject({
                    method: 'POST',
                    url: '/projects/apis/fileanalyse/api/fileanalyse',
                    headers: formData.getHeaders(),
                    payload: formData,
                });

                const body = JSON.parse(response.body);

                assert.equal(
                    response.statusCode,
                    200,
                    'returns a status code of 200',
                );
                assert.equal(
                    response.headers['content-type'],
                    'application/json; charset=utf-8',
                    'returns content type application/json',
                );
                assert.equal(
                    body.name,
                    'yarn.lock',
                    'should return a name of "yarn.lock"',
                );

                assert.equal(
                    body.type,
                    'application/octet-stream',
                    'should return a type of "application/octet-stream"',
                );

                assert.equal(
                    typeof body.size,
                    'string',
                    'should return an "author" prop type "string"',
                );
            } catch (error) {
                console.error(error);
            }
        });

        test('No file', async () => {
            const formData = new FormData();

            try {
                const response = await app.inject({
                    method: 'POST',
                    url: '/projects/apis/fileanalyse/api/fileanalyse',
                    headers: formData.getHeaders(),
                    payload: formData,
                });

                const body = JSON.parse(response.body);

                assert.equal(
                    response.statusCode,
                    400,
                    'returns a status code of 400',
                );
                assert.equal(
                    response.headers['content-type'],
                    'application/json; charset=utf-8',
                    'returns content type application/json',
                );
                assert.equal(
                    body.error,
                    'No file uploaded',
                    'should return an error message',
                );
            } catch (error) {
                console.error(error);
            }
        });
    });
});
