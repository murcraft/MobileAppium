'use strict'

import MainPage from '../../pages/mainPage'
import listingView from '../../pages/listingView'
import search from '../../pages/search'
import searchFilters from '../../pages/searchFilters'
import RandomHelper from '../../helpers/randomHelper'
import analyticsView from '../../pages/analyticsView'

const CONST = require('../../helpers/constHelper.js')

describe('Search Switching: ', () => {

  const searchName1 = RandomHelper.GetRandomString('Search_1')
  const searchName2 = RandomHelper.GetRandomString('Search_2')

  const neighborhood1 = 'Flatiron'
  const neighborhood2 = 'Battery Park'
  const neighborhood3 = 'Turtle Bay'
  let initialResults = 0
  let resultsCount1 = 0
  let resultsCount2 = 0

  beforeAll(() => {
    MainPage.SignInAs(PARAMS.USERS.CORE)
  })

  it(`check save in a new search`, () => {
    listingView.openListingsView()
    search.openNewSearch()
    initialResults = listingView.getTotalListingsCount()
    expect(search.saveSearchButton().isElementDisplayed()).toBe(true, 'Save Search is not present')
  })

  it(`filter by Nh in searchName1`, () => {
    search.editSearch()
    searchFilters.filterByNeighborhoods(neighborhood1)
    searchFilters.clickViewListings()
    expect(search.saveSearchButton().isElementDisplayed()).toBe(true, 'Save Search is not present')
  })

  it(`save first search searchName1`, () => {
    resultsCount1 = listingView.getTotalListingsCount()
    listingView.openAnalyticsView()
    analyticsView.clickChatByName(CONST.ANALYTICS_CHART.LISTINGS, CONST.ANALYTICS_TAB.MKT_SHARE, CONST.ANALYTICS_OPTION.ELEVATOR)
    search.saveSearchAs(searchName1)
    expect(search.saveSearchButton().isElementDisplayed()).toBe(false, 'Save Search is present')
  })

  it(`add a new chart in searchName2`, () => {
    search.openNewSearch()
    expect(search.saveSearchButton().isElementDisplayed()).toBe(true, 'Save Search is not present')
    analyticsView.clickChatByName(CONST.ANALYTICS_CHART.ACRIS_CLOSINGS, CONST.ANALYTICS_TAB.LOCATION, CONST.ANALYTICS_OPTION.PRICE)
  })

  it(`save second search searchName2 with filter`, () => {
    search.editSearch()
    searchFilters.filterByNeighborhoods(neighborhood2)
    searchFilters.clickViewListings()
    listingView.openListingsView()
    resultsCount2 = listingView.getTotalListingsCount()
    expect(listingView.sortListingsByLabel().getElementText()).toEqual('Newest', 'Current Sort')
    search.saveSearchAs(searchName2)
    expect(search.saveSearchButton().isElementDisplayed()).toBe(false, 'Save Search is present')
  })

  it(`reopen first searchName1 saved search and check`, () => {
    search.openSearchByName(searchName1)
    expect(listingView.getTotalListingsCount()).toEqual(resultsCount1, 'Heading count is different')
    search.editSearch()
    expect(searchFilters.getSelectedNhValues()).toEqual([neighborhood1], 'Locations selected')
    searchFilters.viewListingsButton().clickElement()
    listingView.openAnalyticsView()
    expect(analyticsView.isChartPresent('Listings: Elevator')).toBe(true, 'Elevator chart is absent')
  })

  it(`reopen second searchName2 saved search and change`, () => {
    search.openSearchByName(searchName2)
    expect(analyticsView.isChartPresent('ACRIS Closings: Median Sale Price')).toBe(true, 'Price chart is absent')
    search.editSearch()
    searchFilters.filterByNeighborhoods(neighborhood3)
    expect(searchFilters.getSelectedNhValues()).toEqual([neighborhood2, neighborhood3], 'Locations selected')
    searchFilters.clickViewListings()
    listingView.openListingsView()
    search.saveChangesToSearch()
    resultsCount2 = listingView.getTotalListingsCount()
  })

  it(`reopen first and second saved searches and check`, () => {
    search.openSearchByName(searchName1)
    search.openSearchByName(searchName2)
    expect(listingView.getTotalListingsCount()).toEqual(resultsCount2, 'Heading count is different')
    search.editSearch()
    expect(searchFilters.getSelectedNhValues()).toEqual([neighborhood2, neighborhood3], 'Locations selected')
  })

  it(`reopen first saved search and check view`, () => {
    searchFilters.viewListingsButton().clickElement()
    search.openSearchByName(searchName1)
    expect(listingView.getTotalListingsCount()).toEqual(resultsCount1, 'Heading count is different')
  })
})