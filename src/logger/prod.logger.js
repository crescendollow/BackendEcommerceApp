const winston = require('winston')
const customLevelsOptions = require('../utils/loggerCustomLevelsOptions.util')

const logger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: './logs/warnings.log',
      level: 'warning',
      format: winston.format.simple(),
    }),
  ],
})

module.exports = logger
