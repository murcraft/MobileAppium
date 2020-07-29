'use strict'

let ClientsController = require('../requests/clientsController')

let ApiClient = require('../apiClient')

class ClientsHelper {

  static async CreateClientFor (user, client) {
    let apiClient = new ApiClient(user)
    await apiClient.authenticate()
    console.log(`Creating client with email '${client.email}' for user '${user.email}'`)
    // await Logger.Debug(`Creating client with email '${client.email}' for user '${user.email}'`)
    let request = ClientsController.GetPostClientsRequest()
    request.options.json = {
      'name': client.name,
      'email': client.email,
      'phone': client.phone,
      'company': client.company,
      'title': client.title,
      'message': client.message,
      'uninvited': !client.isInvite,
      'property_id': '',
      'list_id': await ClientsHelper.GetGroupIdByName(user, client.group)
    }
    return await apiClient.executeRequest(request)
  }

  static async GetGroupIdByName (user, groupName) {
      let apiClient = new ApiClient(user)
      console.log('inner ', apiClient)
      await apiClient.authenticate(true)

    // await Logger.Debug(`Getting groupId by name '${groupName}' for user '${user.email}'`)
    let request = ClientsController.GetClientGroupsRequest()

    let groupId
    let response = await apiClient.executeRequest(request)
    for (let i = 0; i < response.length; i++) {
      if (response[i].name === groupName) {
        groupId = response[i].id
        break
      }
    }
    // await Logger.Debug(`Group ID is '${groupId}'`)
    return groupId
  }

  // static async DeleteClientFor (user, client) {
  //   let appApiClient = new AppApiClient(user)
  //   await appApiClient.authenticate(true)
  //
  //   await Logger.Debug(`Deleting client with email '${client.email}' for user '${user.email}'`)
  //
  //   let request = DeleteClients.GetDeleteClientByIdRequest(await this.GetClientIdByEmail(user, client.email))
  //
  //   let response = await appApiClient.executeRequest(request, true)
  //   await expect(response.success).toBe(true, 'success')
  // }
  //
  // static async GetClientIdByEmail (user, clientEmail) {
  //   let appApiClient = new AppApiClient(user)
  //   await appApiClient.authenticate(true)
  //
  //   await Logger.Debug(`Getting userId by email '${clientEmail}' for user '${user.email}'`)
  //   let request = GetClients.GetGetClientsRequest()
  //
  //   let clientId
  //   let response = await appApiClient.executeRequest(request, true)
  //
  //   for (let i = 0; i < response.length; i++) {
  //     if (response[i].user.email === clientEmail) {
  //       clientId = response[i].id
  //       break
  //     }
  //   }
  //   await Logger.Debug(`User ID is '${clientId}'`)
  //   return clientId
  // }

}

module.exports = ClientsHelper
