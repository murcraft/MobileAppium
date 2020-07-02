'use strict'

import login from '../../pages/login'
import settings from '../../pages/settings'

describe('Log in as Listing Manager', () => {

  const user = { email: 'test-web+mgmt-core@perchwell.com', pass: 'perchwell' }
  const expectedName = 'TEST TEST-WEB+MGMT-CORE@PERCHWELL.COM'
  const expectedOptions = ['Tags', 'Clients', 'Discussions', 'Manage Listings', 'Ask a Question']

  it('Check settings options', () => {
    login.clickLoginButton()
    login.setEmailAndPassAsUser(user.email, user.pass)
    expect(login.isKeyboardPresent()).toBe(true, 'Keyboard is not present for login input')
    login.hideKeyboard()
    login.clickLoginButton()
    settings.getSettingsButton().clickElement()
    const emailName = settings.getEmailLabel().getElementText()
    const options = settings.getOptions().getAllElementsTextArray()
    expect(emailName === expectedName).toBe(true, `Existing '${emailName}' is not equal to expected '${expectedName}'`)
    expect(options).toEqual(expectedOptions, `Existing '${options}' is not equal to expected '${expectedOptions}'`)
  })

})
