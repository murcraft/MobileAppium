'use strict'

const CONST = require('../../helpers/constHelper.js')

import MainPage from '../../pages/mainPage'
import listingView from '../../pages/listingView'
import search from '../../pages/search'
import listingDetails from '../../pages/listingDetails'

describe('Similar Listings Search and Sorting: ', () => {

  it('log in and start new search', () => {
    MainPage.SignInAs(PARAMS.USERS.CORE)
    listingView.openListingsView()
    search.openNewSearch()
  })

  it('select listing and check the number of selected', () => {
    listingView.selectFirstListingCheckBox().clickElement()
    const listNum = listingView.getSelectedListingNumber()
    expect(listingView.selectedAllListingsButton().isElementDisplayed()).toBe(true, 'Select All button is not displayed')
    expect(listingView.deselectedAllListingsButton().isElementDisplayed()).toBe(true, 'Deselect All button is not displayed')
    expect(listingView.menuSelectedListingButton().isElementDisplayed()).toBe(true, 'Menu button is not displayed')
    expect(listNum).toEqual('1 Selected', '1 Selected should be')
  })

  it('select all listings and check the number of selected', () => {
    listingView.selectedAllListingsButton().clickElement()
    const listNum = listingView.getSelectedListingNumber()
    expect(listNum).toEqual('20 Selected', '20 Selected should be')
    expect(listingView.selectedAllListingsButton().getElementText()).toEqual('Select All', 'Select All button is not displayed')
    expect(listingView.deselectedAllListingsButton().getElementText()).toBe('Deselect All', 'Deselect All button is not displayed')
    expect(listingView.menuSelectedListingButton().isElementDisplayed()).toBe(true, 'Menu button is not displayed')
  })

  it('deselect all listings and check', () => {
    listingView.deselectedAllListingsButton().clickElement()
    expect(listingView.totalListingsCountLabel().isElementDisplayed()).toBe(true, 'Listings count is not displayed')
    expect(listingView.selectedAllListingsButton().getElementText()).toEqual('Newest', 'Sort by button is not displayed')
    expect(listingView.deselectedAllListingsButton().isElementDisplayed()).toBe(false, 'Deselect All button is displayed')
    expect(listingView.menuSelectedListingButton().isElementDisplayed()).toBe(false, 'Menu button is displayed')
  })

  it('open Similar listings', () => {
    listingView.listingCardLabelByNumber(1).tapElement()
    listingDetails.swipeToVisibleInView(listingDetails.similarListingsButton(), listingDetails.scrolledViewLabel())
    listingDetails.moreListingsLabel().clickElement()
  })

  it('search by BD', () => {
    const arr = listingDetails.listingAllBedsLabel().getAllElementsTextArray()
    const search = arr[0] === 'Studio' ? arr[0] : `${arr[0]}BD`
    listingDetails.searchByTextBox().clearSetValue(`${search}`)
    const bedsArr = listingDetails.listingAllBedsLabel().getAllElementsTextArray()
    bedsArr.forEach(value => {
      expect(value).toEqual(arr[0], 'Incorrect BD value in listing')
    })
  })

  it('search by BA', () => {
    const arr = listingDetails.listingAllBathsLabel().getAllElementsTextArray()
    const search = arr[0] === '1½' ? '1.5' : `${arr[0]}`
    listingDetails.searchByTextBox().clearSetValue(`${search}BA`)
    const bathsArr = listingDetails.listingAllBathsLabel().getAllElementsTextArray()
    bathsArr.forEach(value => {
      expect(value).toContain(arr[0], 'Incorrect BA value in listing')
    })
  })

  it('search by Location', () => {
    const arr = listingDetails.getAllLocationsLabel().getAllElementsTextArray()
    listingDetails.searchByTextBox().clearSetValue(arr[0])
    const locArr = listingDetails.getAllLocationsLabel().getAllElementsTextArray()
    locArr.forEach(value => {
      expect(value).toEqual(arr[0], 'Incorrect Location value in listing')
    })
  })

  it('search by Sqft', () => {
    const arr = listingDetails.getAllSqftLabel().getAllElementsTextArray()
    listingDetails.searchByTextBox().clearSetValue(arr[0])
    const sqftArr = listingDetails.getAllSqftLabel().getAllElementsTextArray()
    sqftArr.forEach(value => {
      expect(value).toEqual(arr[0], 'Incorrect Sqft value in listing')
    })
  })

  it('search by Unit', () => {
    const arr = listingDetails.getAllAddressesLabel().getAllElementsTextArray()
    const existingUnitsArr = arr.map(value => {
      const unitValue = value.match(/#[\w+\-]+/g)
      return unitValue[0]
    })
    listingDetails.searchByTextBox().clearSetValue(existingUnitsArr[0])
    const unitArr = listingDetails.getAllAddressesLabel().getAllElementsTextArray()
    unitArr.forEach(value => {
      expect(value).toContain(existingUnitsArr[0], 'Incorrect Unit value in listing')
    })
  })

  it('search by Address', () => {
    const arr = listingDetails.getAllAddressesLabel().getAllElementsTextArray()
    const existingAddrArr = arr.map(value => {
      return value.split('#')[0]
    })
    listingDetails.searchByTextBox().clearSetValue(existingAddrArr[0])
    const unitArr = listingDetails.getAllAddressesLabel().getAllElementsTextArray()
    unitArr.forEach(value => {
      expect(value).toContain(existingAddrArr[0], 'Incorrect Address value in listing')
    })
  })

  it('check Most Expensive sort', () => {
    listingDetails.searchByTextBox().clearSetValue('')
    listingDetails.sortByButton().clickElement()
    listingDetails.sortByNameLabel(CONST.SORT_BY.MOST_EXPENSIVE.toUpperCase()).tapElement()
    const arr = listingDetails.getIntsFromArr(listingDetails.getAllPricesLabel().getAllElementsTextArray())
    for (let i = 0; i < arr.length - 1; i++) {
      expect(parseInt(arr[i])).toBeGreaterThanOrEqual(parseInt(arr[i + 1]), 'Incorrect Price sort')
    }
  })

  it('check Least Expensive sort', () => {
    listingDetails.sortByButton().clickElement()
    listingDetails.sortByNameLabel(CONST.SORT_BY.LEAST_EXPENSIVE.toUpperCase()).tapElement()
    const arr = listingDetails.getIntsFromArr(listingDetails.getAllPricesLabel().getAllElementsTextArray())
    for (let i = 0; i < arr.length - 1; i++) {
      expect(parseInt(arr[i])).toBeLessThanOrEqual(parseInt(arr[i + 1]), 'Incorrect Price sort')
    }
  })

  it('check Bedrooms sort desc', () => {
    listingDetails.sortByButton().clickElement()
    listingDetails.sortByNameLabel(CONST.SORT_BY.BEDROOMS.toUpperCase()).tapElement()
    const arr = listingDetails.getIntsFromArr(listingDetails.listingAllBedsLabel().getAllElementsTextArray())
    for (let i = 0; i < arr.length - 1; i++) {
      expect(parseInt(arr[i])).toBeGreaterThanOrEqual(parseInt(arr[i + 1]), 'Incorrect Bedrooms sort')
    }
  })
})