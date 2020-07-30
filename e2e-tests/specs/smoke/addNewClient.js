'use strict'

import listingView from '../../pages/listingView'
import MainPage from '../../pages/mainPage'
import ClientModel from '../../models/clientModel'
import settings from '../../pages/settings'
import clientView from '../../pages/clientView'
import alerts from '../../pages/alerts'
import MailTrapHelper from '../../helpers/mailTrapHelper'

const CONST = require('../../helpers/constHelper.js')

describe('Add New Client: ', () => {

  const client = ClientModel.GetRandomClient()

  beforeAll(() => {
    MainPage.SignInAs(PARAMS.USERS.CORE)
  })

  it('Go to Clients', () => {
    listingView.getSettingsButton().clickElement()
    settings.getOptions(CONST.VIEWS.CLIENTS).clickElement()
    clientView.getAddNewClient().clickElement()
  })

  it('Add New Client with empty fields', () => {
    clientView.getInviteButton().clickElement()
    expect(alerts.getAlertLabelForAddClient().isElementDisplayed()).toBe(true, 'Alert is not shown')
    const notifyAlert = alerts.getAlertLabelForAddClient().getElementText()
    alerts.getOkAlert().clickElement()
    expect(notifyAlert).toContain('Email and name are required', 'Alert is not shown')
  })

  it('Add New Client without name', () => {
    clientView.getEmailTextBox().clearSetValue(client.email)
    clientView.setClientGroup(client.group)
    clientView.getInviteButton().clickElement()
    const notifyAlert = alerts.getAlertRequiredFieldsAndClose()
    expect(notifyAlert).toContain('Email and name are required', 'Alert is not shown')
  })

  it('Add New Client without email', () => {
    clientView.getEmailTextBox().clearSetValue('')
    clientView.getNameTextBox().clearSetValue(client.name)
    clientView.getInviteButton().clickElement()
    const notifyAlert = alerts.getAlertRequiredFieldsAndClose()
    expect(notifyAlert).toContain('Email and name are required', 'Alert is not shown')
  })

  it('Add New Client without group', () => {
    clientView.getPreviousViewButton().tapElement()
    clientView.getAddNewClient().clickElement()
    clientView.getEmailTextBox().clearSetValue(client.email)
    clientView.getNameTextBox().clearSetValue(client.name)
    clientView.getInviteButton().clickElement()
    const notifyAlert = alerts.getAlertLabelForAddClient().getElementText()
    expect(notifyAlert).toContain('Please select a group', 'Alert is not shown')
  })

  it('Add New Contacts Client with all fields', () => {
    alerts.getOkAlert().clickElement()
    clientView.fillOutClientRequiredAndAdd(client)
  })

  it('Check added Client is in Clients list', () => {
    clientView.getSearchTextBox().clearSetValue(client.name)
    clientView.getClientOptionByName(client.name).tapElement()
    let currentClient = {}
    currentClient.name = clientView.getExactClientName().getElementText()
    currentClient.email = clientView.getExactClientEmail().getElementText()
    currentClient.group = clientView.getExactClientGroup().getElementText()
    expect(currentClient.name).toEqual(client.name.toUpperCase())
    expect(currentClient.email).toEqual(client.email)
    expect(currentClient.group).toEqual(client.group)
  })

  it('Client gets invitation in email', async () => {
    const textMessage = await MailTrapHelper.GetTxtBodyForEmailByEmailTo(client.email, MailTrapHelper.GetSubjects().INVITATION)
    expect(textMessage).toContain(client.name, 'Email message does not contain client name')
    expect(textMessage).toContain('CORE Group Marketing, LLC Logo', 'Email message does not contain logo')
    expect(textMessage).toContain('Accept Invitation', 'Email message does not contain invitation')
  })
})