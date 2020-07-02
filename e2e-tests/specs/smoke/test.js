'use strict'

import login from '../../pages/login'
import listingView from '../../pages/listingView'
import ApiClient from '../../api/apiClient'
import ClientHelper from '../../api/requests/clientHelper'
import ClientModel from '../../api/models/clientModel'

xdescribe('WebdriverIO and Appium, when interacting with a login form,', () => {

  it('should be able login successfully', async () => {
    const user = {email: 'test-web+mgmt-core@perchwell.com', pass: 'perchwell'}
    const client = new ApiClient(user)
    const reso = await client.getAuthenticationToken(user)
    const request = ClientHelper.GetPostNewClientRequest()
    const clientModel = ClientModel.GetRandomClient()

    await client.executeRequest(request)

  })

})