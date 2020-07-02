'use strict'

import BasePage from './basePage'
import MailTrapHelper from '../helpers/mailTrapHelper'
import login from './login'

class MainPage extends BasePage {

  static SignInAs (user) {
    login.clickLoginButton()
    login.setEmailAndPassAsUser(user.email, user.pass)
    expect(login.isKeyboardPresent()).toBe(true, 'Keyboard is not present for login input')
    login.hideKeyboard()
    login.clickLoginButton()
  }

  static async SignOut () {
    await Logger.Debug('Signing out')
    await browser.get('/accounts/sign_out')
  }

  static async AcceptInvitationNotSignOut (email, subject) {
    await this.SignOut()
    await MailTrapHelper.AcceptInvitation(email, subject)
    // await onBoardPage.setNewPassword('perchwell')
  }

}

export default MainPage