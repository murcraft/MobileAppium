'use strict'

import Button from '../elements/button'
import BasePage from './basePage'
import Label from '../elements/label'

class AnalyticsView extends BasePage {

  chartButtonByName (name) {
    const elem = {
      android: `~Analytics Option: ${name}`
    }
    return new Button(elem[platform], `Chart Tab '${name}'`)
  }

  chartOptionButtonByName (name) {
    const elem = {
      android: `~${name}`
    }
    return new Button(elem[platform], `Chart Option '${name}'`)
  }

  chartCountLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/centerTextNumberTextView")`
    }
    return new Label(elem[platform], `Chart count`)
  }

  chartTitleLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/titleTextView")`
    }
    return new Label(elem[platform], `Chart title`)
  }

  clickChatByName (chart, chartType, chartOption) {
    this.chartButtonByName(chart).tapElement()
    this.chartOptionButtonByName(chartType).tapElement()
    this.chartOptionButtonByName(chartOption).swipeUpVisible()
    const elemLoc = this.chartOptionButtonByName(chartOption).getElementLocation()
    this.tapByCoordinates(elemLoc.x, elemLoc.y)
  }

  getChartTotalCount () {
    const totalCount = this.chartCountLabel().getElementText()
    return parseInt(totalCount.replace(/\W/, ''))
  }

  isChartPresent (chartName) {
    const title = this.chartTitleLabel().getElementText()
    return title.includes(chartName)
  }
}

export default new AnalyticsView()