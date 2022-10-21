const winston = require('winston');
const config = require('./config');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
    config.env === 'development' ? winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }) : winston.format.timestamp(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(
      ({ level, message, timestamp, metadata }) => `${timestamp} - ${level}: ${message} - context: ${metadata.context}`
    )
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = logger;
