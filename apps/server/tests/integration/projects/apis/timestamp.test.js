import tape from 'tape';
import { build } from '../../../helpers.js';

const { test } = tape;

test('GET /projects/apis/timestamp', async t => {
  const app = await build();

  t.teardown(() => app.close());

  try {
    const response = await app.inject({
      method: 'GET',
      url: '/projects/apis/timestamp/api',
    });

    const body = JSON.parse(response.body);
    t.equal(response.statusCode, 200, 'returns a status code of 200');
    t.equal(
      response.headers['content-type'],
      'application/json; charset=utf-8',
      'returns content type application/json',
    );
    t.equal(typeof body.unix, 'number', 'returns an object with a number unix');
    t.equal(typeof body.utc, 'string', 'returns an object with a string utc');
  } catch (error) {
    console.error(error);
  }
});

[
  {
    expectedUnix: 1451001600000,
    expectedUtc: 'Fri, 25 Dec 2015 00:00:00 GMT',
    date: '1451001600000',
  },
  {
    expectedUnix: 819203040000,
    expectedUtc: 'Sun, 17 Dec 1995 12:24:00 GMT',
    date: 'December%2017,%201995%2013:24:00',
  },
  {
    expectedUnix: 819203040000,
    expectedUtc: 'Sun, 17 Dec 1995 12:24:00 GMT',
    date: 'December 17, 1995 13:24:00',
  },
].forEach(({ expectedUnix, expectedUtc, date }) => {
  test(`GET /projects/apis/timestamp/api/:date when date is ${date}`, async t => {
    const app = await build();

    t.teardown(() => app.close());

    try {
      const response = await app.inject({
        method: 'GET',
        url: `/projects/apis/timestamp/api/${date}`,
      });

      const body = JSON.parse(response.body);
      t.equal(response.statusCode, 200, 'returns a status code of 200');
      t.equal(
        response.headers['content-type'],
        'application/json; charset=utf-8',
        'returns content type application/json',
      );
      t.equal(body.unix, expectedUnix, 'returns an object with a number unix');
      t.equal(body.utc, expectedUtc, 'returns an object with a string utc');
    } catch (error) {
      console.error(error);
    }
  });
});

test('GET /projects/apis/timestamp/api/not-a-date', async t => {
  const app = await build();

  t.teardown(() => app.close());

  try {
    const response = await app.inject({
      method: 'GET',
      url: '/projects/apis/timestamp/api/not-a-date',
    });

    const body = JSON.parse(response.body);
    t.equal(response.statusCode, 400, 'returns a status code of 400');
    t.equal(
      response.headers['content-type'],
      'application/json; charset=utf-8',
      'returns content type application/json',
    );
    t.equal(body.error, 'Invalid Date', 'returns an error');
  } catch (error) {
    console.error(error);
  }
});
