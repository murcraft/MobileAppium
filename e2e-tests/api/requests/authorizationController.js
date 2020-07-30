'use strict'

class AuthorizationController {

  static GetPostSignInRequest (user) {
    return {
      resource: 'accounts/sign_in?search_token=OTVjOWI0YTQtNmU2My00YjY5LThjYTMtODM4MTk5MzQ2ZTgw&major_version=4&minor_version=7&maintenance_version=4',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Perch/Android',
          'Accept': 'application/json'
        },
        json: {
          "user": {
            "email": user.email,
            "password": user.pass
          }
        }
      }
    }
  }
}

export default AuthorizationController