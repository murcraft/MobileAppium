'use strict'

import Label from '../elements/label'
import Button from '../elements/button'

const CONST = require('../helpers/constHelper.js')

class SearchFilters {

  resetFilters () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/action_button")',
    }
    return new Button(elem[platform], 'Reset Filters')
  }

  bathroomsOption (option) {
    const elem = {
      android: `android=new UiSelector().descriptionContains("Bathrooms Option").text("${option}")`,
    }
    return new Button(elem[platform], `Bathrooms Option '${option}' Selected`)
  }

  bathroomsValue (option, value) {
    const elem = {
      android: `android=new UiSelector().descriptionContains("Bathrooms ${option}").text("${value}")`,
    }
    return new Button(elem[platform], `Bathrooms ${option} value ${value}`)
  }

  bathroomsValueSelected () {
    const elem = {
      android: `android=className("android.widget.TextView").descriptionMatches("Bathrooms [A-Za-z]+: \\d½?\\+?-SELECTED")`,
    }
    return new Button(elem[platform], `Bathrooms value`)
  }

  viewListings () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/showListingsButton")',
    }
    return new Button(elem[platform], 'View Listings')
  }

  filterSectionByName (name) {
    const elem = {
      android: `android=new UiSelector().resourceId("com.perchwell.re.staging:id/search_expandable_layout").childSelector(textContains("${name}"))`,
    }
    return new Label(elem[platform], `Filters section '${name}'`)
  }

  filterByBathrooms (isRange = true, valueMin, ...args) {
    const selection = isRange ? CONST.FILTERS_SELECTION.RANGE : CONST.FILTERS_SELECTION.MINIMUM
    const rangeParams = [...args]
    this.filterSectionByName(CONST.FILTERS.BATHROOMS).swipeUpVisible()

    this.bathroomsOption(selection).tapElement()
    this.bathroomsValue(selection, valueMin).tapElement()
    if (isRange) {
      rangeParams.forEach(value => {
        this.bathroomsValue(selection, value).tapElement()
      })
    }
  }

  isBathroomsRangeSelected () {
    this.filterSectionByName(CONST.FILTERS.BATHROOMS).swipeUpVisible()
    return this.bathroomsOption(CONST.FILTERS_SELECTION.RANGE).isElementChecked()
  }

  getBathroomsValue () {
    this.filterSectionByName(CONST.FILTERS.BATHROOMS).swipeUpVisible()
    if(!this.bathroomsValueSelected().isElementDisplayed()) {
      return []
    } else {
      return this.bathroomsValueSelected().getAllElementsTextArray()
    }
  }

  clickViewListings () {
    this.viewListings().tapElement()
  }
}

export default new SearchFilters()