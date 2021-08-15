/* eslint-disable no-console */

import { hasProperty } from '../utils';

const isDebug = process.env.DEBUG_MODE === 'true';
const skipLogging = process.env.NODE_ENV !== 'test' ? false : !isDebug;

export function buildLogContextString(context) {
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

export function logRequestInfo(context, ...info) {
    if (skipLogging) return;
    const contextString = buildLogContextString(context);
    console.info(contextString, ...info);
}

export function logRequestError(context, ...errors) {
    if (skipLogging) return;
    const contextString = buildLogContextString(context);
    console.error(contextString, ...errors);
}

export function logInfo(contextString, ...logs) {
    if (skipLogging) return;
    if (isDebug) console.trace();

    console.info(contextString, ...logs);
}

export function $logInfo(context, ...logs) {
    const contextString = buildLogContextString(context);

    if (arguments.length === 1) {
        return (..._logs) => {
            logInfo(contextString, ..._logs);
        };
    }

    logInfo(contextString, ...logs);
}

export function logDebug(context, ...logs) {
    const contextString = buildLogContextString(context);

    if (isDebug) {
        console.info(contextString, ...logs);
    }
}

export function logError(context, error) {
    if (skipLogging) return;
    const contextString = buildLogContextString(context);
    console.error(contextString, error);
}
