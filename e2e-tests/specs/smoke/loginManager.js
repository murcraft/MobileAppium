'use strict'

import settings from '../../pages/settings'
import MainPage from '../../pages/mainPage'

describe('Log in as Listing Manager: ', () => {

  const expectedOptions = ['Tags', 'Clients', 'Discussions', 'Manage Listings', 'Ask a Question']

  it('Check settings options', () => {
    MainPage.SignInAs(PARAMS.USERS.CORE)
    settings.getSettingsButton().clickElement()
    const emailName = settings.getEmailLabel().getElementText()
    const options = settings.getOptions().getAllElementsTextArray()
    expect(emailName === 'TEST ' + PARAMS.USERS.CORE.email.toUpperCase()).toBe(true, `Existing '${emailName}' is not equal to expected '${PARAMS.USERS.CORE.email}'`)
    expect(options).toEqual(expectedOptions, `Existing '${options}' is not equal to expected '${expectedOptions}'`)
  })

})
