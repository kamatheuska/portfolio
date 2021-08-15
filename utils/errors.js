import { TypeErrorException, Exception } from '../services/exceptions';
import * as exceptions from '../constants/exceptions';

export function isTypeOrThrow(subject) {
    if (typeof subject !== 'string') {
        throw new TypeErrorException(`Subject ${subject} is not of type string`);
    }
}

export function isEqualOrThrow(subject, object, { GivenException = Exception, errorMessage = '' }) {
    if (subject !== object) {
        throw new GivenException(
            `Subject ${subject} is not of equal to ${object} -> ${errorMessage}`,
        );
    }
}
export function isLessThanOrThrow(subject, object, { GivenException = Exception, errorMessage = '' }) {
    if (subject === object) {
        throw new GivenException(
            `Subject ${subject} should be less than ${object} -> ${errorMessage}`,
        );
    }
}
export function isTruthyOrThrow(subject, GivenException = Exception) {
    if (!subject) {
        throw new GivenException(`${subject} is falsy`);
    }
}
export function isTruthyOrThrowMessage(
    subject,
    { GivenException, errorMessage } = { GivenException: Exception, errorMessage: '' },
) {
    if (!subject) {
        throw new GivenException(errorMessage);
    }
}

export function transformErrorToException(error, { message = '', code = exceptions.GENERIC }) {
    const exception = new Exception(`${message}\n${error.message}`);
    exception.name = `${error.name}Exception`;
    exception.stack = error.stack;
    exception.code = code;

    return exception;
}
