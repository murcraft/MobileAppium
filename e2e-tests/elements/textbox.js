'use strict'

const Logger = require('../utils/loggerHelper')
import BaseElement from './baseElement'

class TextBox extends BaseElement {

  constructor (by, name) {
    super(by, `${name} textBox`)
  }

  hideKeyboard () {
    browser.hideKeyboard()
  }

  clearSetValue (value) {
    this.waitForDisplayed()
    Logger.Debug(`${this.name} :: Clearing and typing text '${value}'`)
    $(this.by).setValue(value)
  }

  clearSetValuePass (value) {
    this.waitForDisplayed()
    Logger.Debug(`${this.name} :: Clearing and typing pass`)
    $(this.by).setValue(value)
    browser.pause(300)
    this.hideKeyboard()
  }

  clearSetValueHide (value) {
    this.clearSetValue(value)
    browser.pause(300)
    this.hideKeyboard()
  }
}

export default TextBox