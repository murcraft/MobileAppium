'use strict'

import Label from '../elements/label'

class ListingView {

  sortedLabel () {
    const elem = {
      android: '~Sort Button: NEWEST',
      ios: ''
    }
    return new Label(elem.android, 'Log in')
  }

  getCurrentSorting() {
    const ss = this.sortedLabel().getElementText()
    console.log(ss)
    return ss
  }

}

export default new ListingView()