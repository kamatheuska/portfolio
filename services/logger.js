const { hasProperty } = require('../utils');

function buildLogContextString(context) {
    if (
        typeof context === 'object' &&
        hasProperty(context, 'method') &&
        hasProperty(context, 'method')
    ) {
        const { method, url } = context;
        return `\n[${method.toUpperCase()} ${url}]`;
    }

    return typeof context === 'string' ? `[${context}]:` : '';
}

function logRequestInfo(context, ...info) {
    const contextString = buildLogContextString(context);
    console.info(contextString, ...info);
}

function logRequestError(context, ...errors) {
    const contextString = buildLogContextString(context);
    console.error(contextString, ...errors);
}

function logInfo(context, ...info) {
    const contextString = buildLogContextString(context);
    console.info(contextString, ...info);
}

function logError(context, error) {
    const contextString = buildLogContextString(context);
    console.error(contextString, error);
}

exports.logRequestInfo = logRequestInfo;
exports.logRequestError = logRequestError;
exports.logInfo = logInfo;
exports.logError = logError;
