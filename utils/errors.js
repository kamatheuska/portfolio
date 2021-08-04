const { TypeErrorException, Exception } = require('../services/exceptions');

function isTypeOrThrowException(subject) {
    if (typeof subject !== 'string') {
        throw new TypeErrorException(`Subject ${subject} is not of type string`);
    }
}

function transformErrorToException(error, { message = '', code = exceptions.GENERIC }) {
    const exception = new Exception(`${message}\n${error.message}`);
    exception.name = `${error.name}Exception`;
    exception.stack = error.stack;
    exception.code = code;

    return exception;
}

exports.isTypeOrThrowException = isTypeOrThrowException;
exports.transformErrorToException = transformErrorToException;
