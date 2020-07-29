'use strict'

import BasePage from './basePage'
import Label from '../elements/label'
import Button from '../elements/button'
import TextBox from '../elements/textbox'

class Search extends BasePage {

  newSearchLabel () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/title")',
    }
    return new Label(elem[platform], 'New Search')
  }

  editSearchButton () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/edit_search_button")',
    }
    return new Button(elem[platform], 'Edit Search')
  }

  savedSearchButton () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/my_saved_searches_button")',
    }
    return new Button(elem[platform], 'Saved Search')
  }

  saveSearchButton () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/save")`,
    }
    return new Button(elem[platform], 'Save Search')
  }

  saveSearchTextBox () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/search_src_text")`,
    }
    return new TextBox(elem[platform], 'Save Search')
  }

  submitSaveSearchButton () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/submitButton")`,
    }
    return new Button(elem[platform], 'Submit Save Search')
  }

  newSearchButton () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/newSearchButton")',
    }
    return new Button(elem[platform], 'New Search')
  }

  savedSearchLabelByName (name) {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/titleTextView").text("${name}")`,
    }
    return new Label(elem[platform], `Saved Search '${name}'`)
  }

  saveSearchChangesButton () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/itemTextView").text("Overwrite")`,
    }
    return new Label(elem[platform], `Save Changes in Search`)
  }

  editSearch () {
    this.newSearchLabel().clickElement()
    this.editSearchButton().clickElement()
  }

  openNewSearch () {
    this.newSearchLabel().clickElement()
    this.savedSearchButton().clickElement()
    this.newSearchButton().clickElement()
    this.waitForLoadingElement()
  }

  saveSearchAs (name) {
    this.saveSearchButton().clickElement()
    this.saveSearchTextBox().clearSetValue(name)
    this.submitSaveSearchButton().clickElement()
    browser.pause(300)
  }

  openSearchByName (name) {
    this.newSearchLabel().clickElement()
    this.savedSearchButton().clickElement()
    this.savedSearchLabelByName(name).swipeUpVisible()
    this.savedSearchLabelByName(name).clickElement()
  }

  saveChangesToSearch () {
    this.saveSearchButton().clickElement()
    this.saveSearchChangesButton().clickElement()
  }
}

export default new Search()