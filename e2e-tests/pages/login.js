'use strict'

import Button from '../elements/button'
import TextBox from '../elements/textbox'
import BasePage from './basePage'

class Login extends BasePage {

  _loginButton () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/log_in")',
      ios: ''
    }
    return new Button(elem.android, 'Log in button')
  }

  _emailTextBox () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/email")'
    }
    return new TextBox(elem.android, 'Email textBox')
  }

  _passwordTextBox () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/password")'
    }
    return new TextBox(elem.android, 'Password textBox')
  }

  _forgotPasswordButton () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/forgot_password")'
    }
    return new Button(elem.android, 'Forgot password button')
  }

  setEmail(email) {
    this._emailTextBox().clearSetValue(email)
  }

  setPassword(pass) {
    this._passwordTextBox().clearSetValuePass(pass)
  }

  setEmailAndPassAsUser(email, pass) {
    this.setEmail(email)
    this.setPassword(pass)
  }

  clickLoginButton () {
    this._loginButton().clickElement()
  }

  clickForgotPassword () {
    this._forgotPasswordButton().clickElement()
  }

  // setNewPassword (pass) {
  //   this.setPasswordField(pass)
  //   this.setConfirmPasswordField(pass)
  //   this.clickSetPassword()
  // }
}

export default new Login()