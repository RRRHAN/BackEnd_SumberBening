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
    throw new ApiDebug(httpStatus.BAD_REQUEST, 'Invalid Username', context);
  }

  if (user.password !== payload.password) {
    throw new ApiDebug(httpStatus.BAD_REQUEST, 'Invalid password', context);
  }

  const token = generateToken(user);

  return { accessToken: token };
};

module.exports = {
  login,
};