'use strict'

const Logger = require ('../utils/loggerHelper')
import BaseElement from './baseElement'

class TextBox extends BaseElement {

  constructor (by, name) {
     super(by, `${name} textBox`)
  }

  clearSetValue (value) {
    this.waitForDisplayed()
    Logger.Debug(`${this.name} :: Clearing and typing text '${value}'`)
    $(this.by).setValue(value)
  }

  clearSetValuePass (value) {
    this.waitForDisplayed()
    Logger.Debug(`${this.name} :: Clearing and typing text '${value}'`)
    $(this.by).setValue(value)
  }
}

export default TextBox