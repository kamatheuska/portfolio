const { logRequestError } = require('../services/logger');

function errorLogger(error, req, res, next) {
    logRequestError(req, error);
    next();
}

function errorResponseHandler(error, req, res, next) {
    res.status(400).send();
}

exports.errorLogger = errorLogger;
exports.errorResponseHandler = errorResponseHandler;
