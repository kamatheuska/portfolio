const { logInfo } = require('../services/logger');
const { disconnectFromDatabase } = require('../db');
const { getConfig } = require('../config');

/**
 * @param {import('express').Application} app
 */
const startServer = (app) => {
    const { port } = getConfig();

    return app.listen(port, () => {
        logInfo('init.startServer', `Server started on port ${port}`);
    });
};

/**
 * @param {import('http2').Http2Server} server
 */
const stopServer = (server) =>
    new Promise((resolve, reject) => {
        if (!server) throw new TypeError('No server passed');
        server.close((error) => {
            if (error) return reject(error);

            const { port } = getConfig();

            logInfo('app.stopServer', `Stopped listening to port ${port}`);

            disconnectFromDatabase().then(resolve).catch(reject);
        });
    });

exports.startServer = startServer;
exports.stopServer = stopServer;
