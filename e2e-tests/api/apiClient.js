'use strict'
//
// let got = require('got')
// const Logger = require('../utils/loggerHelper')
//
// let PostSignIn = require('./requests/authorizationController')
//
// let prefix = process.env.env === 'DEV' ? 'dev' : 'staging'
// let baseURL = `https://${prefix}.perchwell.com/`
//
class ApiClient {
//
  constructor (user) {
    this._user = user
    this._url = baseURL
    this.authentication_token = null
  }
//
  static GetRequest (request) {
//     return {
//       method: request.method,
//       headers: request.headers,
//       body: request.data,
//       json: true,
//     }
  }
//
  static PostRequest (request) {
//     let options = {
//       method: request.method,
//       headers: request.headers,
//
//     }
//     if (options.headers['Content-Type'].includes('multipart/form-data')) {
//       options.formData = request.data
//     }
//     if (options.headers['Content-Type'].includes('application/x-www-form-urlencoded')) {
//       options.form = request.data
//     } else {
//       options.json = request.data
//       options.json = true
//     }
//     return options
//   }
//
//   async executeRequest (request) {
//     request.options.headers === undefined ? request.headers = { 'Content-Type': 'application/json' } : ''
//     request.options.headers.Authorization = this.authentication_token
//     request.options.responseType = 'json'
//     request.options.throwHttpErrors = true
//     request.options.resolveBodyOnly = false
//     switch (request.options.method.toLowerCase()) {
//       case 'get': {
//         return await this.execute(request)
//       }
//       default: {
//         return await this.execute(request)
//       }
//     }
  }
//
  async execute (request) {
//     try {
//       const response = await got(this._url + request.resource, request.options)
//       console.log('Execute REQUEST ', response.body)
//       return response.body
//     } catch (err) {
//       Logger.Error(`Error. Response:`, err)
//     }
  }
//
  async authenticate () {
//     const request = PostSignIn.GetPostSignInRequest(this._user)
//     const additionalOptions = {
//       responseType: 'json',
//       throwHttpErrors: true,
//       resolveBodyOnly: false
//     }
//     const options = {...request.options, ...additionalOptions}
//     console.log(options)
//     try {
//       const response = await got(this._url + request.resource, options)
//       console.log(response.body.authentication_token)
//       this.authentication_token = response.body.authentication_token
//     } catch (err) {
//       console.log(`Authentication failed. Response: ${err}`)
//       // Logger.Error(`Authentication failed. Response:`, err)
//     }
  }
//
  sleep (ms) {
//     Logger.Debug(`Sleeping for ${ms} ms`)
//     return new Promise(resolve => setTimeout(resolve, ms))
  }
//
}

export default ApiClient