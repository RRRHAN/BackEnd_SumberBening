const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');

/**
 * Generate token
 * @param {object} user
 * @param {string} user.username
 * @param {string} user.password
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (
  user,
  expires = moment().add(config.jwt.accessTokenExpirationMinutes, 'minutes'),
  secret = config.jwt.secret
) => {
  const payload = {
    ...user,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

module.exports = generateToken;
