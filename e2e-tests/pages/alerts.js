'use strict'

import BasePage from './basePage'
import Label from '../elements/label'
import Button from '../elements/button'

class Alerts extends BasePage {

  getAlertLabelForAddClient () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/alertTitle")'
    }
    return new Label(elem[platform], 'Required name/email')
  }

  getOkAlert () {
    const elem = {
      android: 'android=resourceId("android:id/button1")'
    }
    return new Button(elem[platform], 'OK')
  }

  getAlertRequiredFieldsAndClose () {
    const alertText = this.getAlertLabelForAddClient().getElementText()
    this.getOkAlert().clickElement()
    return alertText
  }
}

export default new Alerts()