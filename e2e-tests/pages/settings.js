'use strict'

import BasePage from './basePage'
import Label from '../elements/label'

class Settings extends BasePage {

  getEmailLabel () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/nameTextView")'
    }
    return new Label(elem[platform], 'Settings user name')
  }

  getOptions (option = '') {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/textView").textContains("${option}")`
    }
    return new Label(elem[platform], 'Settings views')
  }
}

export default new Settings()