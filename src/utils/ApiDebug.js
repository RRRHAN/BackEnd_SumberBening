const ApiError = require('./ApiError');

class ApiDebug extends ApiError {
  constructor(statusCode, message, context, isOperational = true, stack = '') {
    super(statusCode, message, context, isOperational, stack);
    this.level = 'debug';
  }
}

module.exports = ApiDebug;
