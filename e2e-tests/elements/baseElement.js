'use strict'

const timeout = 60000
// const Logger = require ('../utils/loggerHelper')

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
    Logger.Debug(`${this.name} :: Clicking`)
    $(this.by).click()
  }

  clickElement () {
    this.waitForDisplayed()
    Logger.Debug(`${this.name} :: Clicking`)
    $(this.by).click()
  }

  getElementText () {
    this.waitForDisplayed()
    Logger.Debug(`${this.name} :: Getting text`)
    const textValue = $(this.by).getText()
    Logger.Debug(`${this.name} :: Text is '${textValue}'`)
    return textValue
  }

  getAllElementsTextArray () {
    this.waitForDisplayed()
    return this.getAllElementsTextArrayWithoutWaiting()
  }

  getAllElementsTextArrayWithoutWaiting () {
    Logger.Debug(`${this.name} :: Getting text for all elements`)
    const elements = $$(this.by)
    const textArr = elements.map(element => element.getText())
    Logger.Debug(`All elements text array is: ${textArr}`)
    return textArr
  }
}