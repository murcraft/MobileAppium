'use strict'

import BasePage from './basePage'
import login from './login'

class MainPage extends BasePage {

  static SignInAs (user) {
    login.clickLoginButton()
    login.setEmailAndPassAsUser(user.email, user.pass)
    login.clickLoginButton()
  }
}

export default MainPage