'use strict'

import MainPage from '../../pages/mainPage'
import settings from '../../pages/settings'

describe('Log in as Agent', () => {

  const user = { email: 'helen.kuzniatsova@perchwell.com', pass: 'perchwell' }
  const expectedName = 'Hele'
  const expectedOptions = ['Tags', 'Clients', 'Discussions', 'Manage Listings','Ask a Question']

  it('Check settings options', () => {
    MainPage.SignInAs(user)
    settings.getSettingsButton().clickElement()
    const emailName = settings.getEmailLabel().getElementText()
    const options = settings.getOptions().getAllElementsTextArray()
    expect(emailName === expectedName).toBe(true, `Existing '${emailName}' is not equal to expected '${expectedName}'`)
    expect(options).toEqual(expectedOptions, `Existing '${options}' is not equal to expected '${expectedOptions}'`)
  })
})
