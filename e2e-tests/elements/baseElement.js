'use strict'

const timeout = 60000

export default class BaseElement {

  constructor (by, name) {
    this.by = by
    this.name = name
  }

  isElementDisplayed () {
    return $(this.by).isDisplayed()
  }

  waitForDisplayed (timeoutMs = timeout) {
    const start = Date.now()
    while (!this.isElementDisplayed()) {
      const now = Date.now()
      if (now - start > timeoutMs) {
        throw new Error(`${this.name} :: Element still not displayed after ${timeoutMs} ms`)
      }
    }
  }

  clickElementWithoutWaiting () {
    // Logger.Debug(`${this.name} :: Clicking`)
    $(this.by).click()
  }

  clickElement () {
    this.waitForDisplayed()
    // Logger.Debug(`${this.name} :: Clicking`)
    $(this.by).click()
  }

  clearSetValue (value) {
    this.waitForDisplayed()
    // Logger.Debug(`${this.name} :: Clearing and typing text '${value}'`)
    $(this.by).setValue(value)
  }

  getElementText () {
    this.waitForDisplayed()
    // Logger.Debug(`${this.name} :: Clicking`)
    $(this.by).getText()
  }
}