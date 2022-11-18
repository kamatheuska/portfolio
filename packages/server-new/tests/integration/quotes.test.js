import tape from 'tape';
import { build } from '../helpers.js';

const { test } = tape;

test('GET /projects/apis/quotes/random', async t => {
  const app = await build();

  t.teardown(() => app.close());

  try {
    const response = await app.inject({
      method: 'GET',
      url: '/projects/apis/quotes/random',
    });

    const body = JSON.parse(response.body);
    t.equal(response.statusCode, 200, 'returns a status code of 200');
    t.equal(response.headers['content-type'], 'application/json; charset=utf-8', 'returns content type application/json');
    t.equal(
      typeof body.id,
      'string',
      'should return an "id" prop type "string"',
    );

    t.equal(
      typeof body.text,
      'string',
      'should return an "text" prop type "string"',
    );

    t.equal(
      typeof body.author,
      'string',
      'should return an "author" prop type "string"',
    );
  } catch (error) {
    console.error(error);
  }
});
