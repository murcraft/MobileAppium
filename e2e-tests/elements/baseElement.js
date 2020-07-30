'use strict'

const timeout = 60000
const Logger = require ('../utils/loggerHelper')

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

  waitForNotDisplayed (timeoutMs = timeout) {
    const startTime = Date.now()
    while (this.isElementDisplayed()) {
      const nowTime = Date.now()
      if (nowTime - startTime > timeoutMs) {
        throw new Error(`${this.name} :: Element still is displayed after ${timeoutMs} ms`)
      }
    }
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

  isElementChecked () {
    this.waitForDisplayed()
    const attr = $(this.by).getAttribute('checked')
    return attr === 'true'
  }

  tapElement () {
    this.waitForDisplayed()
    Logger.Debug(`${this.name} :: Tapping`)
    browser.touchAction({
      action: 'tap',
      element: $(this.by),
    })
  }

  swipeUpDown (upDown, coordinate, startPointY, endPointY) {
    Logger.Debug(`Swipe ${upDown}`)
    const viewSize = browser.getWindowSize()
    coordinate = coordinate === undefined ? viewSize.width / 2 : coordinate
    const yDownCoordinate = startPointY === undefined ? viewSize.height - 410 : startPointY
    const yUpCoordinate = endPointY === undefined ? viewSize.height / 3 : endPointY
    const startPoint = upDown === 'down' ? yUpCoordinate : yDownCoordinate
    const endPoint = upDown === 'down' ? yDownCoordinate : yUpCoordinate

    browser.touchAction([
      { action: 'press', x: coordinate, y: startPoint },
      { action: 'wait', ms: 1000 },
      { action: 'moveTo', x: coordinate, y: endPoint },
      { action: 'release' },
    ])
  }

  swipeUpVisible (coordinate, startPoint, endPoint) {
    this.swipeToVisible(true, coordinate, startPoint, endPoint)
  }

  swipeDownVisible (coordinate, startPoint, endPoint) {
    this.swipeToVisible(false, coordinate, startPoint, endPoint)
  }

  swipeToVisible (direction, coordinate, startPoint, endPoint) {
    Logger.Debug(`${this.name} :: Scrolling into view`)
    const startTime = Date.now()
    while (!(this.isElementDisplayed())) {
      if (direction) {
        this.swipeUpDown('up', coordinate, startPoint, endPoint)
      } else {
        this.swipeUpDown('down', coordinate, startPoint, endPoint)
      }
      browser.pause(1000)
      const endTime = Date.now()
      if (endTime - startTime > timeout) {
        throw new Error(`${this.name} :: Long Scrolling... Can't find the element`)
      }
    }
  }

  getElementLocation () {
    this.waitForDisplayed()
    Logger.Debug(`${this.name} :: Getting location`)
    const location = $(this.by).getLocation()
    Logger.Debug(`${this.name} :: Location is '${JSON.stringify(location)}'`)
    return location
  }

  getElementSize () {
    this.waitForDisplayed()
    Logger.Debug(`${this.name} :: Getting location`)
    const size = $(this.by).getSize()
    Logger.Debug(`${this.name} :: Size is '${JSON.stringify(size)}'`)
    return size
  }
}