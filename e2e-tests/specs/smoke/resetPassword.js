'use strict'

import MainPage from '../../pages/mainPage'
import settings from '../../pages/settings'
import login from '../../pages/login'

describe('Reset Password', () => {

  const user = { email: 'helen.kuzniatsova.cl@perchwell.com', pass: 'perchwell' }
  const expectedName = 'Helen'
  const expectedOptions = ['Tags', 'Agents', 'Discussions', 'Ask a Question']

  it('Check settings options', () => {
    login.clickLoginButton()

    settings.getSettingsButton().clickElement()
    const emailName = settings.getEmailLabel().getElementText()
    const options = settings.getOptions().getAllElementsTextArray()
    expect(emailName === expectedName).toBe(true, `Existing '${emailName}' is not equal to expected '${expectedName}'`)
    expect(options).toEqual(expectedOptions, `Existing '${options}' is not equal to expected '${expectedOptions}'`)
  })
})
