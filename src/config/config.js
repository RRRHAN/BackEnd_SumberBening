const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(7000),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    BASIC_AUTH_USERNAME: Joi.string().required().description('username for basic auth authorization'),
    BASIC_AUTH_PASSWORD: Joi.string().required().description('password for basic auth authorization'),
    ACCESS_USERNAME: Joi.string().required().description('username for access APi'),
    ACCESS_PASSWORD: Joi.string().required().description('password for access APi'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessTokenExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  },
  basicAuth: {
    username: envVars.BASIC_AUTH_USERNAME,
    password: envVars.BASIC_AUTH_PASSWORD,
  },
  accessUser: {
    username: envVars.ACCESS_USERNAME,
    password: envVars.ACCESS_PASSWORD,
  },
};
