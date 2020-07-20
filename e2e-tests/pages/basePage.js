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
}

export default BasePage