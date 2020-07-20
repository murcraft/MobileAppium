'use strict'

import BasePage from './basePage'
import Button from '../elements/button'
import TextBox from '../elements/textbox'
import Label from '../elements/label'

class ClientView extends BasePage {

  getAddNewClient () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/discussButton")`
    }
    return new Button(elem[platform], 'Add New Client')
  }

  getNameTextBox () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/name_edit_text")`
    }
    return new TextBox(elem[platform], 'Name')
  }

  getEmailTextBox () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/email_edit_text")`
    }
    return new TextBox(elem[platform], 'Email')
  }

  getGroupLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/client_group")`
    }
    return new Label(elem[platform], 'Group')
  }

  getGroupLabelByName (name) {
    const elem = {
      android: `~${name}`
    }
    return new Label(elem[platform], `Group name '${name}'`)
  }

  getInviteButton () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/inviteButton")'
    }
    return new Button(elem[platform], 'Invite')
  }

  getSearchTextBox () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/search_src_text")'
    }
    return new TextBox(elem[platform], 'Search Client')
  }

  getClientOptionByName (name) {
    const elem = {
      android: `~${name.toUpperCase()}`
    }
    return new TextBox(elem[platform], 'Search Client')
  }

  getExactClientName () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/name")'
    }
    return new Label(elem[platform], 'Client Name')
  }

  getExactClientEmail () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/email_value_text_view")'
    }
    return new Label(elem[platform], 'Client Email')
  }

  getExactClientGroup () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/client_group_text_view")'
    }
    return new Label(elem[platform], 'Client Group')
  }

  getPreviousViewButton () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/up_button")'
    }
    return new Button(elem[platform], 'Previous View')
  }

  fillOutClientRequiredFields (client) {
    this.getNameTextBox().clearSetValue(client.name)
    this.getEmailTextBox().clearSetValue(client.email)
    this.setClientGroup(client.group)
  }

  fillOutClientRequiredAndAdd (client) {
    this.fillOutClientRequiredFields(client)
    this.getInviteButton().tapElement()
  }

  setClientGroup (group) {
    this.getGroupLabel().clickElement()
    this.getGroupLabelByName(group).clickElement()
  }
}

export default new ClientView()