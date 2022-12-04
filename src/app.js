const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const auth = require('./middlewares/auth');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiDebug = require('./utils/ApiDebug');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse query
app.use((req, res, next) => {
  const { query } = req;
  if (query.sortBy) {
    try {
      query.sortBy = JSON.parse(query.sortBy);
    } catch (err) {
      next(new ApiDebug(httpStatus.BAD_REQUEST, 'sortBy must be a valid object', 'parseQuery-sortBy'));
    }
  }
  if (query.query) {
    try {
      query.query = JSON.parse(query.query);
    } catch (err) {
      next(new ApiDebug(httpStatus.BAD_REQUEST, 'query must be a valid object', 'parseQuery-query'));
    }
  }
  req.query = query;
  next();
});

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: false }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// passport init
app.use(auth.init());

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiDebug(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
