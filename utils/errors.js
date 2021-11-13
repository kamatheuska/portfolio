const { TypeErrorException, Exception } = require('../services/exceptions');
const exceptions = require('../constants/exceptions');

function isTypeOrThrow(subject) {
    if (typeof subject !== 'string') {
        throw new TypeErrorException(`Subject ${subject} is not of type string`);
    }
}

function isEqualOrThrow(subject, target, { GivenException = Exception, errorMessage = '' } = {}) {
    if (subject === target) return;

    throw new GivenException(
        `Subject "${subject}" is not of equal to "${target}" -> ${errorMessage}`,
    );
}

function isLessThanOrThrow(
    subject,
    target,
    { GivenException = Exception, errorMessage = '' } = {},
) {
    if (subject >= target) return;

    throw new GivenException(
        `Subject "${subject}" should be less than "${target}" -> ${errorMessage}`,
    );
}

function isTruthyOrThrow(subject, GivenException = Exception) {
    if (subject) return;

    throw new GivenException(`${subject} is falsy`);
}
function isTruthyOrThrowMessage(
    subject,
    { GivenException, errorMessage } = { GivenException: Exception, errorMessage: '' },
) {
    if (subject) return;

    throw new GivenException(errorMessage);
}

function transformErrorToException(error, { message = '', code = exceptions.GENERIC }) {
    const exception = new Exception(`${message}\n${error.message}`);
    exception.name = `${error.name}Exception`;
    exception.stack = error.stack;
    exception.code = code;

    return exception;
}

exports.isTypeOrThrow = isTypeOrThrow;
exports.isEqualOrThrow = isEqualOrThrow;
exports.isLessThanOrThrow = isLessThanOrThrow;
exports.isTruthyOrThrow = isTruthyOrThrow;
exports.isTruthyOrThrowMessage = isTruthyOrThrowMessage;
exports.transformErrorToException = transformErrorToException;
