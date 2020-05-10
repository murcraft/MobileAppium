'use strict'

import login from '../../pages/login'
import listingView from '../../pages/listingView'

describe('WebdriverIO and Appium, when interacting with a login form,', () => {

  it('should be able login successfully', () => {
    console.log('=====================>>>', driver.isAndroid) /// man be used this instead of using param
    const user = {email: 'test-web+mgmt-core@perchwell.com', pass: 'perchwell'}
    console.log('Running test')
    login.clickLoginButton()
    login.setEmailAndPassAsUser(user)
    login.clickLoginButton()
    const sorted = listingView.getCurrentSorting()
    console.log('>>>>>>>>>>>--->>>>>>>> ', sorted)

  })

})
