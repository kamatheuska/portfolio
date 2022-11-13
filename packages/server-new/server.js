import createApp from './app.js';

function handleError(app, error) {
	app.log.error(error);
	throw error;
}

const start = async () => {
	const app = createApp();

	process.on('uncaughtException', error => handleError(app, error));

	process.on('unhandledRejection', error => {
		throw error;
	});

	try {
		await app.listen({port: 3000});
	} catch (error) {
		handleError(app, error);
	}
};

start();
