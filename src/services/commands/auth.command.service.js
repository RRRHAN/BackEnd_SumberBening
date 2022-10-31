const httpStatus = require('http-status');
const ApiDebug = require('../../utils/ApiDebug');
const config = require('../../config/config');
const generateToken = require('../../utils/generateToken');

/**
 * Login with username and password
 * @param {object} payload
 * @param {string} payload.username
 * @param {string} payload.password
 * @returns {Promise<object>}
 */
const login = async (payload) => {
  const context = 'Auth-login';

  const user = config.accessUser;

  if (user.username !== payload.username) {
    throw new ApiDebug(httpStatus.BAD_REQUEST, 'Invalid username', context);
  }

  if (user.password !== payload.password) {
    throw new ApiDebug(httpStatus.BAD_REQUEST, 'Invalid password', context);
  }

  const token = generateToken(user);

  return { data: { accessToken: token }, message: 'Success login', statusCode: httpStatus.OK };
};

module.exports = {
  login,
};
