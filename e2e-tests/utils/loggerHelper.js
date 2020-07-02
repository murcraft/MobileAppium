'use strict'

const log4js = require('log4js')
const logsPath = require('path').resolve(__dirname, `../logs/app`)

log4js.configure({
  appenders: {
    out: { type: 'stdout', layout: { type: 'colored' } },
    file: { type: 'file', filename: logsPath }
  },
  categories: {
    default: { appenders: ['out', 'file'], level: 'debug' },
    FILE: { appenders: ['file'], level: 'trace' }
  }
})

const logger = log4js.getLogger('E2E')
const loggerFile = log4js.getLogger('FILE')

class LoggerHelper {

  static Trace (message) {
    loggerFile.trace(LoggerHelper.ConvertToString(message))
  }

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