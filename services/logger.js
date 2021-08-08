const { hasProperty } = require('../utils');

const isDebug = !!process.env.DEBUG_MODE;

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

function logInfo(context, ...logs) {
    const contextString = buildLogContextString(context);
    if (isDebug) {
        console.trace();
    }

    return arguments.length === 1
        ? (..._logs) => console.info(contextString, ..._logs)
        : console.info(contextString, ...logs);
}

function logDebug(context, ...logs) {
    const contextString = buildLogContextString(context);

    if (isDebug) {
        console.info(contextString, ...logs);
    }
}

function logError(context, error) {
    const contextString = buildLogContextString(context);
    console.error(contextString, error);
}

exports.logRequestInfo = logRequestInfo;
exports.logRequestError = logRequestError;
exports.logInfo = logInfo;
exports.logDebug = logDebug;
exports.logError = logError;
