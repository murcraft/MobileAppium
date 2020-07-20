'use strict'

import Button from '../elements/button'
import TextBox from '../elements/textbox'
import BasePage from './basePage'

class Login extends BasePage {

  _loginButton () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/logInButton")',
      ios: ''
    }
    return new Button(elem[platform], 'Log in button')
  }

  _emailTextBox () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/emailEditText")'
    }
    return new TextBox(elem[platform], 'Email textBox')
  }

  _passwordTextBox () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/passwordEditText")'
    }
    return new TextBox(elem[platform], 'Password textBox')
  }

  setEmail(email) {
    this._emailTextBox().clearSetValueHide(email)
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
}

export default new Login()