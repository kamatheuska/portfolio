
import fastify from 'fastify';
import projectsContext from './projects/apis/index.js';

export default function createApp() {
	const app = fastify({
		logger: true,
	});

	app.register(projectsContext);

	return app;
}
