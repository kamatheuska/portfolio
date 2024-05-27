import tape from 'tape';
import fs from 'fs';
import FormData from 'form-data';
import { build } from '../../../helpers.js';
import { join } from '../../../../utils/dir.js';

const { test } = tape;

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

test('File Analyse Integration', async t => {
  t.comment('POST /projects/apis/fileanalyse');
  t.test('Small text file', { skip: false }, async st => {
    const app = await build();
    const formData = createMockFormData('plain.txt');

    st.teardown(app.close.bind(app));

    try {
      const response = await app.inject({
        method: 'POST',
        url: '/projects/apis/fileanalyse/api/fileanalyse',
        headers: formData.getHeaders(),
        payload: formData,
      });

      const body = JSON.parse(response.body);

      st.equal(response.statusCode, 200, 'returns a status code of 200');
      st.equal(
        response.headers['content-type'],
        'application/json; charset=utf-8',
        'returns content type application/json',
      );
      st.equal(
        body.name,
        'plain.txt',
        'should return a "name" prop equal to "plain.txt"',
      );

      st.equal(body.type, 'text/plain', 'should return a type of text/plain');

      st.equal(
        typeof body.size,
        'string',
        'should return an "author" prop type "string"',
      );
    } catch (error) {
      console.error(error);
    }
  });

  t.test('Big text file', { skip: false }, async st => {
    const app = await build();
    const formData = createMockFormData('yarn.lock');

    st.teardown(app.close.bind(app));

    try {
      const response = await app.inject({
        method: 'POST',
        url: '/projects/apis/fileanalyse/api/fileanalyse',
        headers: formData.getHeaders(),
        payload: formData,
      });

      const body = JSON.parse(response.body);

      st.equal(response.statusCode, 200, 'returns a status code of 200');
      st.equal(
        response.headers['content-type'],
        'application/json; charset=utf-8',
        'returns content type application/json',
      );
      st.equal(body.name, 'yarn.lock', 'should return a name of "yarn.lock"');

      st.equal(
        body.type,
        'application/octet-stream',
        'should return a type of "application/octet-stream"',
      );

      st.equal(
        typeof body.size,
        'string',
        'should return an "author" prop type "string"',
      );
    } catch (error) {
      console.error(error);
    }
  });

  t.test('No file', async st => {
    const app = await build();
    const formData = new FormData();

    st.teardown(app.close.bind(app));

    try {
      const response = await app.inject({
        method: 'POST',
        url: '/projects/apis/fileanalyse/api/fileanalyse',
        headers: formData.getHeaders(),
        payload: formData,
      });

      const body = JSON.parse(response.body);

      st.equal(response.statusCode, 400, 'returns a status code of 400');
      st.equal(
        response.headers['content-type'],
        'application/json; charset=utf-8',
        'returns content type application/json',
      );
      st.equal(
        body.error,
        'No file uploaded',
        'should return an error message',
      );
    } catch (error) {
      console.error(error);
    }
  });
});
