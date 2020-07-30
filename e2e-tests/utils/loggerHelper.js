'use strict'

const log4js = require('log4js')
const logsPath = require('path').resolve(__dirname, `../logs/results`)

log4js.configure({
  appenders: {
    out: { type: 'stdout', layout: { type: 'colored' } },
    file: { type: 'file', filename: logsPath }
  },
  categories: {
    default: { appenders: ['out', 'file'], level: 'debug' },
  }
})

const logger = log4js.getLogger('E2E')

class LoggerHelper {

  static Info (message) {
    logger.info(LoggerHelper.ConvertToString(message))
  }

  static Debug (message) {
    logger.debug(LoggerHelper.ConvertToString(message))
  }

  static Error (message) {
    logger.error(LoggerHelper.ConvertToString(message))
  }

  static ConvertToString (message) {
    if (message !== undefined) {
      if (message.constructor === {}.constructor) {
        message = JSON.stringify(message, null, '    ')
      }
    }
    return message
  }
}

module.exports = LoggerHelper