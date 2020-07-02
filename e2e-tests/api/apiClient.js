'use strict'

const got = require('got')
const Logger = require('../utils/loggerHelper')
import PostSignIn from './requests/postSignIn'

class ApiClient {

  constructor (user) {
    this._user = user
    this._baseUrl = `https://staging.perchwell.com`
    this._authorization = null
  }

  async executeRequest (request) {
    await this.getAuthenticationToken()
    request.headers === undefined ? request.headers = {'Content-Type': 'application/json'} : ''
    request.headers['Authorization'] = this._authorization

    switch (request.method.toLowerCase()) {
      case 'get': {
        let options = {
          method: request.method,
          headers: request.headers,
          responseType: 'json',
          json: true,
        }
        return await this.execute(request, options)
      }

      default: {
        let options = {
          method: request.method,
          headers: request.headers,
        }
        if (options.headers['Content-Type'].includes('multipart/form-data')) {
          options.body = request.data
        }
        if (options.headers['Content-Type'].includes('application/x-www-form-urlencoded')) {
          options.form = request.data
        } else {
          options.responseType = 'json'
          options.json = true
        }
        return await this.execute(request, options)
      }
    }
  }

  async execute (request, options) {

    try {
      options.throwHttpErrors = false
      const url = this._baseUrl + request.pathEndpoint
      console.log(request)
      console.log(options)
      const response = await got(url, options)
      console.log('!!!!!!!!!!!!!!!!! RESPONSE CLIENT', response.body)
      return response.body
    } catch (err) {
      console.log(err)
    }

  }

  async getAuthenticationToken () {
    if(this._authorization !== null) {
      console.log('token is null')
      return this._authorization
    }
    const  request = PostSignIn.GetPostSignIn(this._user)
    request.headers = { 'Content-Type': 'application/json', 'User-Agent': 'Perch/Android', 'Accept': 'application/json' }
    const url = this._baseUrl + request.pathEndpoint
    const options = {
      method: request.method,
      headers: request.headers,
      json: request.data,
      responseType: 'json'
    }
    try {
      const response = await got(url, options)
      this._authorization = response.body.authentication_token
      return response.body.authentication_token
    } catch (err) {
      console.log('2::: ', err)
    }
  }

}

export default ApiClient