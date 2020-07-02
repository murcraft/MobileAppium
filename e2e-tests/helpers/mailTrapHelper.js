'use strict'
'use strict'

const got = require('got')
const fs = require('fs')
const Path = require('path')
const common = require('../../common.js')

import RandomHelper from './randomHelper'

let isResetTrap = true
let inboxId = common.inboxIdStage
let apiToken = common.mailTrapApiToken

let downloadPath = common.downloadPath
let downloadedPath = common.downloadedPath

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
  AGENT_DATA_EXPORT: 'Perchwell Agent Data Export',
})
const timeout = 120000
let messagesUrl = `https://mailtrap.io/api/v1/inboxes/${inboxId}/messages?api_token=${apiToken}`
let txtBodyUrl = `https://mailtrap.io/api/v1/inboxes/${inboxId}/messages/%s/body.txt?api_token=${apiToken}`
let htmlBodyUrl = `https://mailtrap.io/api/v1/inboxes/${inboxId}/messages/%s/body.html?api_token=${apiToken}`
let attachmentsUrl = `https://mailtrap.io/api/v1/inboxes/${inboxId}/messages/%s/attachments?api_token=${apiToken}`
let acceptLinkPatt = /https:\/\/\S*\/accept_invitation\?invitation_token=\S*/
let clickHereLinkPatt = /https:\/\/\S*\/accounts\/sign_in\?email=\S*/
let getStartedLinkPatt = /https:\/\/share-\S*\/results\S*/
let clickHereToSeeMorePatt = /https:\/\/\S*\/results\?s=\S*/
let listingImageLinkPatt = /https:\/\/share-\S*\/results\S*/
let listingImageExternalLinkPatt = /https:\/\/\S*\/show\S*/
let changePassLinkPatt = /https:\/\/\S*\/accounts\/password\/edit\?reset_password_token=\S*/
let clickHereToDownloadPdfReport = /http:\/\/report-details.perchwell.com\/\S*.pdf/
let clickHereToDownloadCsvReport = /http:\/\/report-details.perchwell.com\/\S*.csv/

const ALERT_HOOK = Object.freeze({
  IMMEDIATE: `${browser.baseUrl}testing/search_run`,
  MORNING: `${browser.baseUrl}testing/search_run_morning`,
  NIGHT: `${browser.baseUrl}testing/search_run_night`,
  MORNING_NIGHT: `${browser.baseUrl}testing/search_run_morning_night`,

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
  text_body: '',
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
      options: {
        responseType: 'json',
        json: true,
      },
    }
  }

  static async GetEmailMessageByToEmailAndSubject (email, subject) {
    await browser.pause(5000)
    let numberOfLast = 30
    const loopCount = Math.floor(timeout / 5000)
    const params = MailTrapHelper.SetOptions(messagesUrl)

    for (let i = 0; i < loopCount; i++) {
      let messagesArray = []
      try {
        messagesArray = await got(params.uri, params.options)
      } catch (error) {
        Logger.Debug(error)
      }
      if (messagesArray.length < numberOfLast) {
        numberOfLast = messagesArray.length
      }
      await Logger.Debug(`Checking last ${numberOfLast} emails`)
      for (let i = 0; i < numberOfLast; i++) {
        if (await (messagesArray[i].to_email).includes(email) && messagesArray[i].subject.includes(subject)) {
          const message = messagesArray[i]
          const id = message.id
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

  //
  // static async GetHtmlBodyByEmailId (messageId) {
  //   let htmlBody = ''
  //   const params = MailTrapHelper.SetOptions(htmlBodyUrl.replace('%s', messageId))
  //   try {
  //     htmlBody = await got(params.uri, params.options)
  //   } catch (error) {
  //     Logger.Error(error)
  //   }
  //   return htmlBody
  // }
  //
  // static async AssureEmailMessageDidNotComeByToEmailIn15Sec (email, subject) {
  //   await browser.sleep(15000)
  //   let numberOfLast = 30
  //   let messagesArray = []
  //   let options = MailTrapHelper.SetOptions(messagesUrl)
  //
  //   await request(options).then(response => {
  //     messagesArray = response
  //   }).catch(error => {
  //     Logger.error(error)
  //   })
  //   for (let i = 0; i < numberOfLast; i++) {
  //     if (await messagesArray[i].to_email === email) {
  //       if (subject !== undefined) {
  //         if (messagesArray[i].subject.includes(subject)) {
  //           await Logger.error(`Email for ${email} was found on MailTrap`)
  //           await Logger.error(`Subject - '${messagesArray[i].subject}'`)
  //           throw `Email for ${email} was found on MailTrap`
  //         }
  //       } else {
  //         await Logger.error(`Email for ${email} was found on MailTrap`)
  //         throw `Email for ${email} was found on MailTrap`
  //       }
  //     }
  //   }
  // }
  //
  static async GetTxtBodyForEmailByEmailTo (email, subject) {
    let message = await this.GetEmailMessageByToEmailAndSubject(email, subject)
    let id = message.id
    let bodyTxt = ''
    let params = MailTrapHelper.SetOptions(txtBodyUrl.replace('%s', id))
    try {
      bodyTxt = await got(params.uri, params.options)
    } catch (error) {
      Logger.Error(error)
    }
    return bodyTxt
  }

  //
  // static async GetAttachmentsForEmailByEmailTo (email, subject) {
  //   let message = await this.GetEmailMessageByToEmailAndSubject(email, subject)
  //   let id = message.id
  //   let attachmentsArray = []
  //   let options = MailTrapHelper.SetOptions(attachmentsUrl.replace('%s', id))
  //
  //   await request(options).then(response => {
  //     attachmentsArray = response
  //   }).catch(error => {
  //     Logger.error(error)
  //   })
  //   return await attachmentsArray
  // }
  //
  // static async DownloadAttachmentsForEmailByEmailToByFilename (email, subject, filename) {
  //   let attachmentsArray = await this.GetAttachmentsForEmailByEmailTo(email, subject)
  //
  //   let attachment = attachmentsArray.filter((x) => {
  //     return x.filename === filename
  //   })[0]
  //
  //   let attachmentUrl = `https://mailtrap.io${attachment.download_path}?api_token=${apiToken}`
  //
  //   if (!fs.existsSync(downloadPath)) {
  //     fs.mkdirSync(downloadPath)
  //   }
  //
  //   let pathFile = await Path.resolve(downloadPath, attachment.filename)
  //
  //   let response = await request({
  //     method: 'GET',
  //     url: attachmentUrl,
  //     responseType: 'stream',
  //   }).pipe(fs.createWriteStream(pathFile))
  //
  //   try {
  //     await new Promise((resolve, reject) => {
  //       response.on('finish', () => {
  //         Logger.debug(`Downloading file ${attachment.filename} ${response.path}`)
  //         resolve(response)
  //       })
  //       response.on('error', () => {
  //         reject()
  //       })
  //     })
  //     return await MailTrapHelper.RenameAndCopyAttachment(pathFile, attachment.filename)
  //   } catch (e) {
  //     Logger.error(e)
  //     throw new Error(e)
  //   }
  // }
  //
  // static async RenameAndCopyAttachment (pathFile, fileName) {
  //   let ext = Path.extname(fileName)
  //   let name = Path.basename(fileName, ext)
  //   let newName = `${RandomHelper.GetRandomString(name)}${ext}`
  //
  //   if (!fs.existsSync(downloadedPath)) {
  //     fs.mkdirSync(downloadedPath)
  //   }
  //   let newPathFile = await Path.resolve(downloadedPath, newName)
  //   await Logger.debug(`Renaming file into ${newName}`)
  //   await fs.copyFileSync(pathFile, newPathFile)
  //   await fs.unlinkSync(pathFile)
  //   await browser.sleep(3000)
  //
  //   try {
  //     await S3Helper.UploadToS3(newPathFile, newName)
  //   } catch (err) {
  //     SlackHelper.PostS3ErrorsToSlack(SuiteDescribe, newName, err.message)
  //     Logger.warn('Error ' + err)
  //   }
  //
  //   return newPathFile
  // }
  //
  // static async ChangeMyPassword (email) {
  //   if (isResetTrap === true) {
  //     let bodyTxt = await this.GetTxtBodyForEmailByEmailTo(email, 'Reset password instructions')
  //     let link = await changePassLinkPatt.exec(bodyTxt)
  //     await Logger.debug(`Navigating to ${link[0]}`)
  //     await browser.get(link[0])
  //   } else {
  //     await GmailApiHelper.ChangeMyPassword(email)
  //   }
  // }
  //
  // static async TriggerSearchAlerts (triggerValue) {
  //   Logger.debug(`Triggering search alerts ${triggerValue}`)
  //   let options = MailTrapHelper.SetOptions(triggerValue)
  //
  //   await request(options).then(response => {
  //     Logger.debug(response)
  //     if (response.success !== true) {
  //       throw `Unsuccessful Search alert triggering`
  //     }
  //   }).catch(error => {
  //     Logger.error(error)
  //     throw error
  //   })
  // }
  //
  static async AcceptInvitation (email, subject) {
    let bodyTxt = await MailTrapHelper.GetTxtBodyForEmailByEmailTo(email, subject)
    try {
      let link = await acceptLinkPatt.exec(bodyTxt)
      await Logger.Debug(`Navigating to ${link[0]}`)
      await browser.get(link[0])
    } catch (err) {
      throw new Error(`Email body doesn't contain link`)
    }
  }

  //
  // static async ClickHere (email, subject) {
  //   let bodyTxt = await this.GetTxtBodyForEmailByEmailTo(email, subject)
  //   let link = await clickHereLinkPatt.exec(bodyTxt)
  //   await Logger.debug(`Navigating to ${link[0]}`)
  //   await browser.get(link[0])
  // }
  //
  // static async GetStarted (email, subject) {
  //   let bodyTxt = await this.GetTxtBodyForEmailByEmailTo(email, subject)
  //   let link = await getStartedLinkPatt.exec(bodyTxt)
  //   await Logger.debug(`Navigating to ${link[0]}`)
  //   await browser.get(link[0])
  // }
  //
  // static async OpenListing (email, subject) {
  //   let bodyTxt = await this.GetTxtBodyForEmailByEmailTo(email, subject)
  //   try {
  //     let link = await listingImageLinkPatt.exec(bodyTxt)
  //     await Logger.debug(`Navigating to ${link[0]}`)
  //     await browser.get(link[0])
  //   } catch (e) {
  //     throw new Error(`Email body doesn't contain link`)
  //   }
  // }
  //
  // static async CheckOutExternal (email, subject) {
  //   let bodyTxt = await this.GetTxtBodyForEmailByEmailTo(email, subject)
  //   try {
  //     let link = await listingImageExternalLinkPatt.exec(bodyTxt)
  //     await Logger.debug(`Navigating to ${link[0]}`)
  //     await browser.get(link[0])
  //   } catch (e) {
  //     throw new Error(`Email body doesn't contain link`)
  //   }
  // }
  //
  // static async ClickHereToSeeMore (email, subject) {
  //   let bodyTxt = await this.GetTxtBodyForEmailByEmailTo(email, subject)
  //   let link = await clickHereToSeeMorePatt.exec(bodyTxt)
  //   await Logger.debug(`Navigating to ${link[0]}`)
  //   await browser.get(link[0])
  // }
  //
  // static async ClickHereToDownloadPdfReport (email, subject) {
  //   let bodyTxt = await this.GetTxtBodyForEmailByEmailTo(email, subject)
  //   try {
  //     let link = await clickHereToDownloadPdfReport.exec(bodyTxt)
  //     await Logger.debug(`Navigating to ${link[0]}`)
  //     await browser.get(link[0])
  //     let fileName = link[0].match(/[\w-_]*.pdf/)
  //     await Logger.debug(`File name is ${fileName[0]}`)
  //     return fileName[0]
  //   } catch (e) {
  //     throw new Error(`Email body doesn't contain link`)
  //   }
  // }
  //
  // static async ClickHereToDownloadCsvReport (email, subject) {
  //   let bodyTxt = await this.GetTxtBodyForEmailByEmailTo(email, subject)
  //   try {
  //     let link = await clickHereToDownloadCsvReport.exec(bodyTxt)
  //     await Logger.debug(`Navigating to ${link[0]}`)
  //     await browser.get(link[0])
  //     let fileName = link[0].match(/[\w-_]*.csv/)
  //     await Logger.debug(`File name is ${fileName[0]}`)
  //     return fileName[0]
  //   } catch (e) {
  //     throw new Error(`Email body doesn't contain link`)
  //   }
  // }
  //
  // static async DeleteMessageByEmailSubject (email, subject) {
  //   let message = await this.GetEmailMessageByToEmailAndSubject(email, subject)
  //   let messageId = message.id
  //   let htmlBody = ''
  //   let options = MailTrapHelper.SetOptions(messagesUrl.replace('?', '/' + messageId + '?'))
  //   options.method = 'DELETE'
  //   options.resolveWithFullResponse = true
  //
  //   await Logger.debug(`Deleting message id ${messageId}`)
  //   await request(options).then(response => {
  //     htmlBody = response
  //   }).catch(error => {
  //     Logger.error(error.message)
  //   })
  //   return htmlBody
  // }
}

export default MailTrapHelper