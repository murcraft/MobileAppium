'use strict'

import MainPage from '../../pages/mainPage'
import listingView from '../../pages/listingView'
import search from '../../pages/search'
import searchFilters from '../../pages/searchFilters'
import analyticsView from '../../pages/analyticsView'

const CONST = require('../../helpers/constHelper.js')

describe('Bathrooms Filtering: ', () => {

  let initialResults = 0
  let currentResults = 0

  it('log in and start new search', () => {
    MainPage.SignInAs(PARAMS.USERS.CORE)
    listingView.openListingsView()
    search.openNewSearch()
  })

  it('set Bath Minimum 2+', () => {
    initialResults = listingView.getTotalListingsCount()
    search.editSearch()
    searchFilters.filterByBathrooms(false, '2+')
    searchFilters.clickViewListings()
    currentResults = listingView.getTotalListingsCount()
    expect(currentResults).not.toEqual(initialResults, 'Initial and filtered listings count is the same')
  })

  it('check Bathrooms 2+ on analytics', () => {
    listingView.openAnalyticsView()
    analyticsView.clickChatByName(CONST.ANALYTICS_CHART.LISTINGS, CONST.ANALYTICS_TAB.MKT_SHARE, CONST.ANALYTICS_OPTION.PRICE)
    expect(analyticsView.getChartTotalCount()).toEqual(currentResults, 'Listings and analytics listings count is not the same')
  })

  it('check Bath Minimum 2+', () => {
    search.editSearch()
    expect(searchFilters.isBathroomsRangeSelected()).toBe(false, 'Range Option is selected')
    expect(searchFilters.getBathroomsValue()).toEqual(['2+'], 'Incorrect Bathroom value is applied')
  })

  it('reset filters, check results', () => {
    searchFilters.resetFiltersButton().clickElement()
    expect(searchFilters.getBathroomsValue()).toEqual([], 'Bathroom value is applied')
    expect(searchFilters.isBathroomsRangeSelected()).toBe(true, 'Range Option is not selected as default')
    searchFilters.clickViewListings()
    expect(analyticsView.getChartTotalCount()).toEqual(initialResults, 'Initial and current analytics results count is the same')
  })

  it('check dumped filter on analytics', () => {
    listingView.openListingsView()
    expect(listingView.getTotalListingsCount()).toEqual(initialResults, 'Initial and current listings results count is the same')
  })
})