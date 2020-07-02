'use strict'

import BasePage from './basePage'
import Button from '../elements/button'
import Label from '../elements/label'

class Settings extends BasePage {

  getSettingsButton () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/profile_image_view")',
      ios: ''
    }
    return new Button(elem.android, 'Settings button')
  }

  getEmailLabel () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/name")',
      ios: ''
    }
    return new Label(elem.android, 'Settings user name')
  }

  getOptions () {
    const elem = {
      android: `android=new UiSelector().resourceId("com.perchwell.re.staging:id/textView")`,
      ios: ''
    }
    return new Label(elem.android, 'Settings views')
  }

  getOptionsText () {
    this.getOptions().getAllElementsTextArray()
  }

}

export default new Settings()