'use strict'

import BaseElement from './baseElement'

class CheckBox extends BaseElement {

  constructor (by, name) {
     super(by, `${name} checkBox`)
  }
}

export default CheckBox