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
const stopServer = async (server) => {
    if (!server) throw new TypeError('No server passed');
    server.close(async () => {
        const { port } = getConfig();

        logInfo('app.stopServer', `Stopped listening to port ${port}`);

        await disconnectFromDatabase();
    });
};

exports.startServer = startServer;
exports.stopServer = stopServer;
