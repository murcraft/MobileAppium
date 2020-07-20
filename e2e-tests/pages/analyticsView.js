'use strict'

import Button from '../elements/button'
import BasePage from './basePage'
import Label from '../elements/label'

class AnalyticsView extends BasePage {

  chartByName (name) {
    const elem = {
      android: `~Analytics Option: ${name}`
    }
    return new Button(elem[platform], `Chart Tab '${name}'`)
  }

  chartOptionByName (name) {
    const elem = {
      android: `~${name}`
    }
    return new Button(elem[platform], `Chart Option '${name}'`)
  }

  chartCount () {
    const elem = {
      android: `android=new UiSelector().resourceId("com.perchwell.re.staging:id/centerTextNumberTextView")`
    }
    return new Label(elem[platform], `Chart count`)
  }

  clickChatByName(chart, chartType, chartOption) {
    this.chartByName(chart).tapElement()
    this.chartOptionByName(chartType).tapElement()
    this.chartOptionByName(chartOption).swipeUpVisible()
    const elemLoc = this.chartOptionByName(chartOption).getElementLocation()
    // this.chartOptionByName(chartOption).clickElement()
    this.tapByCoordinates(elemLoc.x, elemLoc.y)
  }

  getChartTotalCount () {
    const totalCount = this.chartCount().getElementText()
    return parseInt(totalCount.replace(/\W/, ''))
  }


}

export default new AnalyticsView()