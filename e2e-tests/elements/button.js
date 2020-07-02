'use strict'

import BaseElement from './baseElement'

class Button extends BaseElement {

  constructor (by, name) {
     super(by, `${name} button`)
  }
}

export default Button