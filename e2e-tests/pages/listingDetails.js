'use strict'

import Button from '../elements/button'
import BasePage from './basePage'
import TextBox from '../elements/textbox'
import Label from '../elements/label'

class ListingDetails extends BasePage {

  similarListingsButton () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/similar_listing_tab_id").text("SIMILAR LISTINGS")`,
    }
    return new Button(elem[platform], 'Similar Listings')
  }

  searchByTextBox () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/search_src_text")`,
    }
    return new TextBox(elem[platform], 'Search by')
  }

  listingAllBedsLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/beds_count")`,
    }
    return new Label(elem[platform], 'Listing Beds')
  }

  listingAllBathsLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/baths_count")`,
    }
    return new Label(elem[platform], 'Listings Baths')
  }

  getAllLocationsLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/listing_canonical_nh_name")`,
    }
    return new Label(elem[platform], 'Listings Locations')
  }

  getAllAddressesLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/listing_address")`,
    }
    return new Label(elem[platform], 'Listings Address')
  }

  getAllSqftLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/sqft_count")`,
    }
    return new Label(elem[platform], 'Listing Square Feet')
  }

  getAllPricesLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/listing_price")`,
    }
    return new Label(elem[platform], 'Listing Price')
  }

  scrolledViewLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/contentRecyclerView")`,
    }
    return new Label(elem[platform], 'Listings details view')
  }

  moreListingsLabel () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/more_label")`
    }
    return new Label(elem[platform], 'More Listings')
  }

  sortByButton () {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/sort")`
    }
    return new Button(elem[platform], 'Sort By')
  }

  sortByNameLabel (name) {
    const elem = {
      android: `android=resourceId("com.perchwell.re.staging:id/sort_options").childSelector(new UiSelector().descriptionContains("${name}"))`
    }
    return new Button(elem[platform], `Sort By ${name}`)
  }
}

export default new ListingDetails()