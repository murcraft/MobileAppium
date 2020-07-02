'use strict'

class PostSignIn {

  static GetPostSignIn (user) {
    return {
      method: 'POST',
      pathEndpoint: '/accounts/sign_in?search_token=OTVjOWI0YTQtNmU2My00YjY5LThjYTMtODM4MTk5MzQ2ZTgw&major_version=4&minor_version=7&maintenance_version=4',
      data: {
        user: {
          email: user.email,
          password: user.pass
        }
      }
    }
  }
}

export default PostSignIn