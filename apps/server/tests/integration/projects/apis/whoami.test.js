import tape from 'tape';
import { build } from '../../../helpers.js';

const { test } = tape;

test('GET /projects/apis/whoami', async t => {
    const app = await build();

    t.teardown(() => app.close());

    try {
        const response = await app.inject({
            method: 'GET',
            url: '/projects/apis/whoami/api/whoami',
            headers: {
                'accept-language': 'es',
            },
        });

        const body = JSON.parse(response.body);
        t.equal(response.statusCode, 200, 'returns a status code of 200');
        t.equal(
            response.headers['content-type'],
            'application/json; charset=utf-8',
            'returns content type application/json',
        );
        t.equal(
            body.ipaddress,
            '127.0.0.1',
            'should return ipaddress of "127.0.0.1"',
        );

        t.equal(body.language, 'es', 'should return language of "es"');

        t.equal(
            typeof body.software,
            'string',
            'should return software of type "string"',
        );
    } catch (error) {
        console.error(error);
    }
});
