'use strict'

import ClientsController from '../requests/clientsController'
import ApiClient from '../apiClient'

class ClientsHelper {

  static async CreateClientFor (user, client) {
    const apiClient = new ApiClient(user)
    await apiClient.authenticate()
    await Logger.Debug(`Creating client with email '${client.email}' for user '${user.email}'`)

    const request = ClientsController.GetPostClientsRequest()
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
    const apiClient = new ApiClient(user)
    await apiClient.authenticate(true)
    await Logger.Debug(`Getting groupId by name '${groupName}' for user '${user.email}'`)
    const request = ClientsController.GetClientGroupsRequest()
    let groupId
    const response = await apiClient.executeRequest(request)
    for (let i = 0; i < response.length; i++) {
      if (response[i].name === groupName) {
        groupId = response[i].id
        break
      }
    }
    await Logger.Debug(`Group ID is '${groupId}'`)
    return groupId
  }
}

module.exports = ClientsHelper
