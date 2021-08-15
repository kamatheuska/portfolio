/* eslint-disable consistent-return */

import { logRequestError } from '../services/logger';
import * as exceptions from '../constants/exceptions';

export function errorLogger(error, req, res, next) {
    logRequestError(req, error);
    next(error);
}

export function errorResponseMapper(error, req, res, next) {
    next(error);
}

// eslint-disable-next-line no-unused-vars
export function defaultErrorResponse(error, req, res, next) {
    if (error.code === exceptions.DB_DOCUMENT_NOT_FOUND) {
        return res.status(404).send();
    }
    res.status(400).send();
}
