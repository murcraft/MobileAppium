'use strict'

import Label from '../elements/label'

class ListingView {

  sortedLabel () {
    const elem = {
      android: '~Sort Button: NEWEST',
      ios: ''
    }
    console.log(new Label(elem.android, 'Log in button'))
    return new Label(elem.android, 'Log in button')
  }

  getCurrentSorting() {
    return this.sortedLabel().getElementText()
  }

}

export default new ListingView()