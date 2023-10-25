/* eslint-disable camelcase */
import tape from 'tape';
import { build } from '../../../helpers.js';

const { test } = tape;

async function populate(app, payload) {
  const response = await app.inject({
    method: 'POST',
    url: '/projects/apis/shorturl/api/shorturl',
    payload,
  });

  return response;
}

test('ShortUrl Integration', async t => {
  t.test('GET /short/:shortUrl', { skip: false }, async st => {
    let populateResponse;
    const app = await build();
    const payload = {
      url: 'https://github.com/fastify/light-my-request',
    };

    st.teardown(async () => {
      try {
        await app.mongoose.models.ShortUrl.deleteMany({});
        await app.close();
      } catch (error) {
        st.error(error);
      }
    });

    try {
      populateResponse = await populate(app, payload);
    } catch (error) {
      st.error(error);
    }

    try {
      const { short_url } = JSON.parse(populateResponse.body);
      const response = await app.inject({
        method: 'GET',
        url: `/projects/apis/shorturl/api/shorturl/${short_url}`,
      });

      st.equal(
        response.statusCode,
        302,
        'should return a redirect status code of 302',
      );
      st.equal(
        response.headers.location,
        payload.url,
        'should have a location header equal to populate',
      );
    } catch (error) {
      st.error(error);
    }
  });

  t.test('POST /projects/apis/shorturl', async st => {
    const app = await build();
    const payload = {
      url: 'https://github.com/fastify/light-my-request',
    };

    st.teardown(async () => {
      try {
        await app.mongoose.models.ShortUrl.deleteMany({});
        await app.close();
      } catch (error) {
        st.error(error);
      }
    });

    try {
      const response = await app.inject({
        method: 'POST',
        url: '/projects/apis/shorturl/api/shorturl',
        payload,
      });

      const body = response.json();

      st.equal(response.statusCode, 200, 'returns a status code of 200');
      st.equal(
        response.headers['content-type'],
        'application/json; charset=utf-8',
        'returns content type application/json',
      );
      st.equal(
        body.original_url,
        payload.url,
        'should return an "original_url" prop with the same value sended as "url"',
      );
      st.equal(
        typeof body.short_url,
        'string',
        'should return a "short_url" prop type "string"',
      );
    } catch (error) {
      st.error(error);
    }
  });
});
