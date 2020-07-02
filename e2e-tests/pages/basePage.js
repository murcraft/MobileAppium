'use strict'

const Logger = require ('../utils/loggerHelper')

class BasePage {

  isKeyboardPresent () {
    return driver.isKeyboardShown()
  }

  hideKeyboard () {
    Logger.Debug('Hide Keyboard')
    driver.hideKeyboard()
  }
}

export default BasePage