import tape from 'tape';
import createApp from '../../app.js';

const {test} = tape;

test('GET /projects/apis/quotes/random', async t => {
	const app = createApp();

	t.teardown(() => app.close());

	const response = await app.inject({
		method: 'GET',
		url: '/projects/apis/quotes/random',
		headers: 
	});

	t.equal(response.statusCode, 200, 'returns a status code of 200');
	t.equal(typeof response.body?.id, 'string', 'returns an object with a string id');
	t.equal(typeof response.body?.text, 'string', 'returns an object with a string text');
	t.equal(typeof response.body?.author, 'string', 'returns an object with a string author');
});
