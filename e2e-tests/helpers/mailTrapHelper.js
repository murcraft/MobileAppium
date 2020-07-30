'use strict'

const got = require('got')

const timeout = 120000
const inboxId = PARAMS.MAILTRAP.inboxIdStage
const apiToken = PARAMS.MAILTRAP.mailTrapApiToken

const SUBJECT = Object.freeze({
  INVITATION: 'can help you with your real estate search on Perchwell!'
})

let messagesUrl = `https://mailtrap.io/api/v1/inboxes/${inboxId}/messages?api_token=${apiToken}`
let txtBodyUrl = `https://mailtrap.io/api/v1/inboxes/${inboxId}/messages/%s/body.txt?api_token=${apiToken}`
let htmlBodyUrl = `https://mailtrap.io/api/v1/inboxes/${inboxId}/messages/%s/body.html?api_token=${apiToken}`

class MailTrapHelper {

  static GetSubjects () {
    return SUBJECT
  }

  static SetRequest (request) {
    return {
      url: request,
      option: {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json',
        resolveBodyOnly: true
      }
    }
  }

  static async GetEmailMessageByToEmailAndSubject (email, subject) {
    await browser.pause(5000)
    let numberOfLast = 30
    const loopCount = Math.floor(timeout / 5000)
    const request = MailTrapHelper.SetRequest(messagesUrl)

    for (let i = 0; i < loopCount; i++) {
      let messagesArray = []
      try {
        messagesArray = await got(request.url, request.option)
      } catch (error) {
        Logger.Debug(error)
      }
      if (messagesArray.length < numberOfLast) {
        numberOfLast = messagesArray.length
      }
      await Logger.Debug(`Checking last ${numberOfLast} emails`)
      for (let i = 0; i < numberOfLast; i++) {
        if (await (messagesArray[i].to_email).includes(email) && messagesArray[i].subject.includes(subject)) {
          let message = messagesArray[i]
          let id = message.id
          await Logger.Debug(`Message id is ${id}`)

          message.html_body = await MailTrapHelper.GetHtmlBodyByEmailId(id)
          return await message
        }
      }
      await browser.pause(4000)
      await Logger.Debug(`Waiting for email ${(i + 1) * 5}s`)
    }
    await Logger.Error(`Email for ${email} was not found on MailTrap in '${timeout / 1000}'sec`)
    throw `Email for ${email} was not found on MailTrap in '${timeout / 1000}'sec`
  }

  static async GetHtmlBodyByEmailId (messageId) {
    let htmlBody = ''
    const request = MailTrapHelper.SetRequest(htmlBodyUrl.replace('%s', messageId))
    request.option.responseType = 'text'
    try {
      htmlBody = await got(request.url, request.option)
    } catch (error) {
      Logger.Error(error)
    }
    return htmlBody
  }

  static async GetTxtBodyForEmailByEmailTo (email, subject) {
    const message = await this.GetEmailMessageByToEmailAndSubject(email, subject)
    const id = message.id
    let bodyTxt = ''
    const request = MailTrapHelper.SetRequest(txtBodyUrl.replace('%s', id))
    request.option.responseType = 'text'
    try {
      bodyTxt = await got(request.url, request.option)
    } catch (error) {
      Logger.error(error)
    }
    return bodyTxt
  }
}

export default MailTrapHelper