'use strict'

import BasePage from './basePage'
import Button from '../elements/button'
import Label from '../elements/label'

class Settings extends BasePage {

  getSettingsButton () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/profile_image_view")'
    }
    return new Button(elem[platform], 'Settings button')
  }

  getEmailLabel () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/nameTextView")'
    }
    return new Label(elem[platform], 'Settings user name')
  }

  getOptions (option = '') {
    const elem = {
      android: `android=new UiSelector().resourceId("com.perchwell.re.staging:id/textView").textContains("${option}")`
    }
    return new Label(elem[platform], 'Settings views')
  }
}

export default new Settings()