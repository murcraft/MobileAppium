'use strict'

import Label from '../elements/label'

class Login {

  _loginButton () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/log_in")',
      ios: ''
    }
    console.log(new Label(elem.android, 'Log in button'))
    return new Label(elem.android, 'Log in button')
  }

  _emailInput () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/email")'
    }
    return new Label(elem.android, 'Email textBox')
  }

  _passwordInput () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/password")'
    }
    return new Label(elem.android, 'Password textBox')
  }

  setEmailAndPassAsUser(user) {
    this._emailInput().clearSetValue(user.email)
    this._passwordInput().clearSetValue(user.pass)
    driver.hideKeyboard()
  }

  clickLoginButton () {
    this._loginButton().clickElement()
  }
}

export default new Login()