'use strict'

import Label from '../elements/label'
import Button from '../elements/button'
import TextBox from '../elements/textbox'
import BasePage from './basePage'

const CONST = require('../helpers/constHelper.js')

class SearchFilters extends BasePage {

  resetFiltersButton () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/action_button")',
    }
    return new Button(elem[platform], 'Reset Filters')
  }

  bathroomsOptionButton (option) {
    const elem = {
      android: `android=descriptionContains("Bathrooms Option").text("${option}")`,
    }
    return new Button(elem[platform], `Bathrooms Option '${option}' Selected`)
  }

  bathroomsValueButton (option, value) {
    const elem = {
      android: `android=descriptionContains("Bathrooms ${option}").text("${value}")`,
    }
    return new Button(elem[platform], `Bathrooms ${option} value ${value}`)
  }

  bathroomsSelectedButton () {
    const elem = {
      android: `android=className("android.widget.TextView").descriptionMatches("Bathrooms [A-Za-z]+: \\d½?\\+?-SELECTED")`,
    }
    return new Button(elem[platform], `Bathrooms value`)
  }

  viewListingsButton () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/showListingsButton")',
    }
    return new Button(elem[platform], 'View Listings')
  }

  filterSectionLabelByName (name) {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/search_expandable_layout").childSelector(textContains("${name}"))`,
    }
    return new Label(elem[platform], `Filters section '${name}'`)
  }

  addNhButton () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/add_neighborhood_tag")`,
    }
    return new Label(elem[platform], `Add Nh`)
  }

  nhLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/tag_text")`,
    }
    return new Label(elem[platform], `Nh`)
  }

  deleteNhButtonByName (name) {
    const elem = {
      android: `~Remove Button: ${name}`,
    }
    return new Label(elem[platform], `Nh '${name}' Delete`)
  }

  searchNhTextBox () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/search_src_text")`,
    }
    return new TextBox(elem[platform], `Search nh`)
  }

  searchNhOptionLabel (name) {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/name").text("${name}")`,
    }
    return new Label(elem[platform], `Search nh`)
  }

  returnViewButton () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/up_button")`,
    }
    return new Button(elem[platform], `Return View`)
  }

  filterByBathrooms (isRange = true, valueMin, ...args) {
    const selection = isRange ? CONST.FILTERS_SELECTION.RANGE : CONST.FILTERS_SELECTION.MINIMUM
    const rangeParams = [...args]
    this.filterSectionLabelByName(CONST.FILTERS.BATHROOMS).swipeUpVisible()
    this.bathroomsOptionButton(selection).tapElement()
    this.bathroomsValueButton(selection, valueMin).tapElement()
    if (isRange) {
      rangeParams.forEach(value => {
        this.bathroomsValueButton(selection, value).tapElement()
      })
    }
  }

  isBathroomsRangeSelected () {
    this.filterSectionLabelByName(CONST.FILTERS.BATHROOMS).swipeUpVisible()
    return this.bathroomsOptionButton(CONST.FILTERS_SELECTION.RANGE).isElementChecked()
  }

  getBathroomsValue () {
    this.filterSectionLabelByName(CONST.FILTERS.BATHROOMS).swipeUpVisible()
    if(!this.bathroomsSelectedButton().isElementDisplayed()) {
      return []
    } else {
      return this.bathroomsSelectedButton().getAllElementsTextArray()
    }
  }

  clickViewListings () {
    this.viewListingsButton().tapElement()
  }

  filterByNeighborhoods (location, withDefault = false) {
    const defaultLoc = ['Manhattan', 'Brooklyn', 'Queens']
    this.filterSectionLabelByName(CONST.FILTERS.LOCATION).swipeUpVisible()
    this.addNhButton().clickElement()
    if(!withDefault) {
      defaultLoc.forEach(value => {
        if (this.deleteNhButtonByName(value).isElementDisplayed()) {
          this.deleteNhButtonByName(value).clickElement()
        }
      })
    }
    this.searchNhTextBox().clearSetValue(location)
    this.searchNhOptionLabel(location).clickElement()
    this.returnViewButton().clickElement()
  }

  getSelectedNhValues () {
    return this.nhLabel().getAllElementsTextArray()
  }
}

export default new SearchFilters()