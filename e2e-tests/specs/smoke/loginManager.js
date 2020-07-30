'use strict'

import MainPage from '../../pages/mainPage'
import settings from '../../pages/settings'
import tags from '../../pages/tags'
import listingView from '../../pages/listingView'
import manageListings from '../../pages/manageListings'
import clientView from '../../pages/clientView'
import discussions from '../../pages/discussions'

const CONST = require('../../helpers/constHelper.js')

describe('Log in as Listing Manager: ', () => {

  const expectedOptions = ['Tags', 'Clients', 'Discussions', 'Manage Listings', 'Ask a Question']

  beforeAll(() => {
    MainPage.SignInAs(PARAMS.USERS.CORE)
  })

  it('Check settings options', () => {
    listingView.getSettingsButton().clickElement()
    const emailName = settings.getEmailLabel().getElementText()
    const options = settings.getOptions().getAllElementsTextArray()
    expect(emailName === 'TEST ' + PARAMS.USERS.CORE.email.toUpperCase()).toBe(true, `Existing '${emailName}' is not equal to expected '${PARAMS.USERS.CORE.email}'`)
    expect(options).toEqual(expectedOptions, `Existing '${options}' is not equal to expected '${expectedOptions}'`)
  })

  it('Check Tags view is opened', () => {
    settings.getOptions(CONST.VIEWS.TAGS).clickElement()
    expect(tags.getTitleView()).toEqual('MY TAGS', `Incorrect Tags view`)
  })

  it('Check Clients view is opened', () => {
    tags.clickCloseView()
    listingView.getSettingsButton().clickElement()
    settings.getOptions(CONST.VIEWS.CLIENTS).clickElement()
    expect(clientView.getTitleView()).toEqual('MY CLIENTS', `Incorrect Clients view`)
  })

  it('Check Discussions view is opened', () => {
    clientView.clickCloseView()
    listingView.getSettingsButton().clickElement()
    settings.getOptions(CONST.VIEWS.DISCUSSIONS).clickElement()
    expect(discussions.getTitleView()).toEqual('DISCUSSIONS', `Incorrect Discussions view`)
  })

  it('Check Manage Listings view is opened', () => {
    discussions.clickCloseView()
    listingView.getSettingsButton().clickElement()
    settings.getOptions(CONST.VIEWS.MANAGE_LISTINGS).clickElement()
    expect(manageListings.getTitleView()).toEqual('MANAGE LISTINGS', `Incorrect Manage Listings view`)
  })
})
