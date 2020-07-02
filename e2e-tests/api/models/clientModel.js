'use strict'

import RandomHelper from '../../helpers/randomHelper'

class ClientModel {

  static GetRandomClient () {
    return {
      isFull: false,
      name: RandomHelper.GetRandomString('cl'),
      email: RandomHelper.GetRandomString('perchwell.e2e+') + '@gmail.com',
      message: RandomHelper.GetRandomString('message'),
      phone: RandomHelper.GetRandomNumber(1000000),
      company: RandomHelper.GetRandomString('company'),
      title: RandomHelper.GetRandomString('title'),
      isInvite: true,
      group: 'New Contacts',
      pass: 'perchwell',
    }
  }
}

export default ClientModel