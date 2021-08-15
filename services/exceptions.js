/* eslint-disable max-classes-per-file */

import * as exceptions from '../constants/exceptions';
import { hasProperty } from '../utils';

export class Exception extends Error {
    constructor(...params) {
        super(...params);

        if (hasProperty(Error, 'captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Object.defineProperty(this, 'stack', {
                value: new Error().stack,
            });
        }

        Object.defineProperty(this, 'message', {
            value: params[0].message,
        });
        this.name = 'Exception';
        this.date = new Date();
        this.code = exceptions.GENERIC;
        this.message = [...params].join(' - ');
    }
}

export class DocumentNotFoundException extends Exception {
    constructor(...params) {
        super(...params);
        this.name = 'DocumentNotFoundException';
        this.code = exceptions.DB_DOCUMENT_NOT_FOUND;
    }
}

export class TypeErrorException extends Exception {
    constructor(...params) {
        super(...params);
        this.name = 'TypeErrorException';
        this.code = exceptions.TYPE_ERROR;
    }
}

export class RequestParamException extends Exception {
    constructor(...params) {
        super(...params);
        this.name = 'RequestParamException';
        this.code = exceptions.INVALID_REQUEST_PARAM;
    }
}

// Exception.prototype = Object.create(Error.prototype);
// DocumentNotFoundException.prototype = Object.create(Exception.prototype);
// TypeErrorException.prototype = Object.create(Exception.prototype);
// RequestParamException.prototype = Object.create(Exception.prototype);
// RequestParamException.prototype = Object.create(Exception.prototype);

export default {
    Exception,
    DocumentNotFoundException,
    TypeErrorException,
    RequestParamException,
}
