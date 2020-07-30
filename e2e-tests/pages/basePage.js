'use strict'

import Label from '../elements/label'
import Button from '../elements/button'

class BasePage {

  loadingElement () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/image")`,
    }
    return new Label(elem[platform], 'Loading')
  }

  closeViewButton () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/up_button")`
    }
    return new Button(elem[platform], `Close view`)
  }

  titleViewLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/toolbar").childSelector(new UiSelector().resourceId("com.perchwell.re.staging:id/title"))`
    }
    return new Label(elem[platform], `Title view`)
  }

  waitForLoadingElement () {
    this.loadingElement().waitForNotDisplayed()
  }

  clickCloseView () {
    this.closeViewButton().clickElement()
  }

  getTitleView () {
    return this.titleViewLabel().getElementText()
  }

  tapByCoordinates (x, y) {
    Logger.Debug(`Tapping by coordinates ${x}/${y}`)
    browser.touchPerform([
      {
        action: 'tap',
        options: {
          x: x + 1,
          y: y + 1,
        },
      }])
  }

  getIntsFromArr (arr) {
    let intsArr = arr.map((x) => {
      let result = x.match(/\d+(\.\d+)?/g)
      return (result) ? result.join('') : 0
    })
    Logger.Debug(`Ints array is ${intsArr}`)
    return intsArr
  }

  swipeToVisibleInView (swipedElement, viewElement) {
    swipedElement.swipeUpVisible()
    let sizeCard2 = viewElement.getElementLocation()
    let location = swipedElement.getElementLocation()
    let size = swipedElement.getElementSize()
    const topPointView = sizeCard2.y

    let startPoint = location.y + size.height
    let xCoordinate = size.width / 2
    for (let i = 0; i < 4; i++) {
      browser.touchAction([
        { action: 'press', x: xCoordinate, y: startPoint },
        { action: 'wait', ms: 2000 },
        { action: 'moveTo', x: xCoordinate, y: topPointView },
        { action: 'release' },
      ])
    }
  }
}

export default BasePage