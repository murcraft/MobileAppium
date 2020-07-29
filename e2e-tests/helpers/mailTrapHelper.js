'use strict'

const request = require('request-promise')

const timeout = 120000
const inboxId = PARAMS.MAILTRAP.inboxIdStage
const apiToken = PARAMS.MAILTRAP.mailTrapApiToken

const SUBJECT = Object.freeze({
  INVITATION: 'can help you with your real estate search on Perchwell!',
  HAS_PROPS: 'has some great properties to show you on Perchwell!',
  NEW_INTEREST: 'New interest in your listing',
  DISCUSS_LISTING: 'would like to discuss a listing with you!',
  DISCUSS_BUILDING: 'would like to discuss a building with you!',
  RECOMMENDED: 'recommended on Perchwell!',
  REPLY: 'has replied to your message',
  RECOMMENDED_SHORT: 'recommended!',
  CHECK_OUT: 'Check out these listings you may like',
  DROPPED: 'has dropped in price',
  INCREASED: 'has increased in price',
  HAS_GONE: 'has gone off market',
  IS_BACK: 'is back on the market',
  CHANGES_SUMMARY: 'changes summary',
  WELCOME: 'Welcome to Perchwell for',
  PERCHWELL_UPDATE: 'Perchwell update: new listing',
  MARKET_REPORT: 'Perchwell real estate market report',
  DETAILS_REPORT: 'Perchwell real estate market details report',
  AGENT_DATA_EXPORT: 'Perchwell Agent Data Export'
})

let messagesUrl = `https://mailtrap.io/api/v1/inboxes/${inboxId}/messages?api_token=${apiToken}`
let txtBodyUrl = `https://mailtrap.io/api/v1/inboxes/${inboxId}/messages/%s/body.txt?api_token=${apiToken}`
let htmlBodyUrl = `https://mailtrap.io/api/v1/inboxes/${inboxId}/messages/%s/body.html?api_token=${apiToken}`
let attachmentsUrl = `https://mailtrap.io/api/v1/inboxes/${inboxId}/messages/%s/attachments?api_token=${apiToken}`
let acceptLinkPatt = /https:\/\/\S*\/accept_invitation\?invitation_token=\S*/
let clickHereLinkPatt = /https:\/\/\S*\/accounts\/sign_in\?email=\S*/
let getStartedLinkPatt = /https:\/\/staging.perchwell.com\/results#\S*/
let clickHereToSeeMorePatt = /https:\/\/\S*\/results\?s=\S*/
let listingImageLinkPatt = /https:\/\/staging.perchwell.com\/\S*/
let listingImageExternalLinkPatt = /https:\/\/\S*\/show\S*/
let changePassLinkPatt = /https:\/\/\S*\/accounts\/password\/edit\?reset_password_token=\S*/
let clickHereToDownloadPdfReport = /http:\/\/report-details.perchwell.com\/\S*.pdf/
let clickHereToDownloadCsvReport = /http:\/\/report-details.perchwell.com\/\S*.csv/

const ALERT_HOOK = Object.freeze({
  IMMEDIATE: `${PARAMS.BASE_URL}testing/search_run`,
  MORNING: `${PARAMS.BASE_URL}testing/search_run_morning`,
  NIGHT: `${PARAMS.BASE_URL}testing/search_run_night`,
  MORNING_NIGHT: `${PARAMS.BASE_URL}testing/search_run_morning_night`,

})

let message = {
  id: '',
  inbox_id: '',
  subject: '',
  sent_at: '',
  from_email: '',
  from_name: '',
  to_email: '',
  to_name: '',
  html_body: '',
  text_body: ''
}

class MailTrapHelper {

  static GetSubjects () {
    return SUBJECT
  }

  static GetAlertHook () {
    return ALERT_HOOK
  }

  static SetOptions (request) {
    return {
      uri: request,
      json: true
    }
  }

  static async GetEmailMessageByToEmailAndSubject (email, subject) {
    await browser.pause(5000)
    let numberOfLast = 30
    let loopCount = Math.floor(timeout / 5000)
    let options = MailTrapHelper.SetOptions(messagesUrl)

    for (let i = 0; i < loopCount; i++) {
      let messagesArray = []
      await request(options).then(response => {
        messagesArray = response
      }).catch(error => {
        Logger.Debug(error)
      })
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
    let options = MailTrapHelper.SetOptions(htmlBodyUrl.replace('%s', messageId))

    await request(options).then(response => {
      htmlBody = response
    }).catch(error => {
      Logger.Error(error)
    })
    return htmlBody
  }

}

export default MailTrapHelper