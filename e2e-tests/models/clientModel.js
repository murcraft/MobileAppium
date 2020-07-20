'use strict'

const CONST = require('../helpers/constHelper.js')

import RandomHelper from '../helpers/randomHelper'

class ClientModel {

  static GetRandomClient () {
    return {
      name: RandomHelper.GetRandomString('cl'),
      email: RandomHelper.GetRandomString('android.e2e+') + '@perchwell.com',
      group: CONST.CLIENT_GROUP.NEW_CONTACTS,
      message: RandomHelper.GetRandomString('Welcome client') + '@perchwell.com',
      pass: 'perchwell'
    }
  }
}

export default ClientModel