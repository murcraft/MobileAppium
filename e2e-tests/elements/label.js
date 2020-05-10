'use strict'

import BaseElement from './baseElement'

class Label extends BaseElement {

  constructor (by, name) {
     super(by, `${name} label`)
  }
}

export default Label