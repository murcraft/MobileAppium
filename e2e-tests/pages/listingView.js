'use strict'

import Label from '../elements/label'
import Button from '../elements/button'
import BasePage from './basePage'
import CheckBox from '../elements/checkbox'

const CONST = require('../helpers/constHelper.js')

class ListingView extends BasePage {

  getSettingsButton () {
    const elem = {
      android: 'android=resourceId("com.perchwell.re.staging:id/profile_image_view")'
    }
    return new Button(elem[platform], 'Settings button')
  }

  listingCardLabelByNumber (number) {
    const elem = {
      android: `//*[@resource-id="com.perchwell.re.staging:id/foreground_container"][${number}]/..`
    }
    return new Label(elem[platform], `Listing card '${number}'`)
  }

  viewButton (view) {
    const elem = {
      android: `android=new UiSelector().resourceId("com.perchwell.re.staging:id/${view}Button")`,
    }
    return new Button(elem[platform], `${view} View`)
  }

  totalListingsCountLabel () {
    const elem = {
      android: `android=description("Sorted by").childSelector(className("android.widget.TextView"))`,
    }
    return new Label(elem[platform], 'Total listings count')
  }

  selectFirstListingCheckBox () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/multi_select_checkbox").descriptionContains("Select button").instance(0)`,
    }
    return new CheckBox(elem[platform], 'Listing')
  }

  selectedListingsNumberLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/text_switcher").childSelector(new UiSelector().className("android.widget.TextView"))`,
    }
    return new Label(elem[platform], 'Selected Listings')
  }

  selectedAllListingsButton () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/second_label")`,
    }
    return new Button(elem[platform], 'Select All')
  }

  deselectedAllListingsButton () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/third_label")`,
    }
    return new Button(elem[platform], 'Deselect All')
  }

  menuSelectedListingButton () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/menu_button")`,
    }
    return new Button(elem[platform], 'Deselect All')
  }

  sortListingsByLabel () {
    const elem = {
      android: `android=descriptionContains("Sort Button:")`,
    }
    return new Label(elem[platform], 'Sort Listings By')
  }

  getSelectedListingNumber () {
    return this.selectedListingsNumberLabel().getElementText()
  }

  getTotalListingsCount () {
    this.waitForLoadingElement()
    const result = this.totalListingsCountLabel().getElementText()
    return parseInt(result.replace(/\,/, ''))
  }

  openListingsView () {
    this.viewButton(CONST.VIEWS.LIST).clickElement()
  }

  openAnalyticsView () {
    this.viewButton(CONST.VIEWS.ANALYTICS).clickElement()
  }
}

export default new ListingView()