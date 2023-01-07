const logger = require('../config/logger');
const ApiError = require('./ApiError');

const errorReturn = (statusCode, message, context) => {
  logger.error(message, { context });
  return new ApiError(statusCode, message, context);
};

module.exports = errorReturn;
