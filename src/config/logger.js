const winston = require('winston');
const config = require('./config');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const consoleFormat = winston.format.combine(
  enumerateErrorFormat(),
  winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
  winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
  winston.format.colorize(),
  winston.format.splat(),
  winston.format.printf(({ level, message, timestamp, metadata }) => {
    if (config.env === 'development') {
      return `${timestamp} - ${level}: ${message} - context: ${metadata.context}`;
    }
    return `${level}: ${message} - context: ${metadata.context}`;
  })
);

const fileFormat = winston.format.combine(
  enumerateErrorFormat(),
  winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
  winston.format.timestamp(),
  winston.format.uncolorize(),
  winston.format.splat(),
  winston.format.json()
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: config.env === 'development' ? 'debug' : 'info',
      stderrLevels: ['error'],
      format: consoleFormat,
    }),
    new winston.transports.File({
      level: 'error',
      format: fileFormat,
      filename: 'data/error.log',
    }),
    new winston.transports.File({
      level: 'debug',
      format: fileFormat,
      filename: 'data/combined.log',
    }),
  ],
});

module.exports = logger;
