'use strict'

import Label from '../elements/label'
import Button from '../elements/button'
import BasePage from './basePage'

const CONST = require('../helpers/constHelper.js')

class ListingView extends BasePage {

  viewButton (view) {
    const elem = {
      android: `android=new UiSelector().resourceId("com.perchwell.re.staging:id/${view}Button")`,
    }
    return new Button(elem[platform], `${view} View`)
  }

  newSearchLabel () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/title")',
    }
    return new Label(elem[platform], 'New Search')
  }

  editSearchButton () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/edit_search_button")',
    }
    return new Button(elem[platform], 'Edit Search')
  }

  savedSearchButton () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/my_saved_searches_button")',
    }
    return new Button(elem[platform], 'Saved Search')
  }

  newSearchButton () {
    const elem = {
      android: 'android=new UiSelector().resourceId("com.perchwell.re.staging:id/newSearchButton")',
    }
    return new Button(elem[platform], 'New Search')
  }

  totalListingsCount () {
    const elem = {
      android: `android=description("Sorted by").childSelector(className("android.widget.TextView"))`,
    }
    return new Label(elem[platform], 'Total listings count')
  }

  getTotalListingsCount () {
    this.waitForLoadingElement()
    const result = this.totalListingsCount().getElementText()
    return parseInt(result.replace(/\,/, ''))
  }

  openListingsView () {
    this.viewButton(CONST.VIEWS.LIST).clickElement()
  }

  openAnalyticsView () {
    this.viewButton(CONST.VIEWS.ANALYTICS).clickElement()
  }

  openNewSearch () {
    this.newSearchLabel().clickElement()
    this.savedSearchButton().clickElement()
    this.newSearchButton().clickElement()
    this.waitForLoadingElement()
  }
}

export default new ListingView()