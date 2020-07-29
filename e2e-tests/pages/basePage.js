'use strict'

import Label from '../elements/label'

class BasePage {

  loadingElement () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/image")`,
    }
    return new Label(elem[platform], 'Loading')
  }

  waitForLoadingElement () {
    this.loadingElement().waitForNotDisplayed()
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
}

export default BasePage