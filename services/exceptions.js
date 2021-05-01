const exceptions = require('../constants/exceptions')

class Exception extends Error {
  constructor(...params) {
    super(...params);
    
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Exception);
    }

    this.name = 'GenericException';
    this.date = new Date();
    this.code = exceptions.GENERIC;
  }
}

class DocumentNotFoundException extends Exception {
  constructor(...params) {
      super(...params);
      this.name = 'DocumentNotFoundException';
      this.code = exceptions.DB_DOCUMENT_NOT_FOUND;
  }
}

class TypeErrorException extends Exception {
  constructor(...params) {
      super(...params);
      this.name = 'TypeErrorException';
      this.code = exceptions.TYPE_ERROR;
  }
}

class RequestParamException extends Exception {
  constructor(...params) {
      super(...params);
      this.name = 'RequestParamException';
      this.code = exceptions.INVALID_REQUEST_PARAM;
  }
}

Exception.prototype = Object.create(Error.prototype);
DocumentNotFoundException.prototype = Object.create(Exception.prototype);
TypeErrorException.prototype = Object.create(Exception.prototype);
RequestParamException.prototype = Object.create(Exception.prototype);

exports.Exception = Exception
exports.DocumentNotFoundException = DocumentNotFoundException
exports.TypeErrorException = TypeErrorException
exports.RequestParamException = RequestParamException