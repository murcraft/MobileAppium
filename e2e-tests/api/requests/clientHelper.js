'use strict'

import ApiClient from '../apiClient'

class ClientHelper {

  static GetPostNewClientRequest () {
    return {
      method: 'POST',
      pathEndpoint: '/api/clients'
    }
  }

  static async  CreateClientFor (user, client) {
    const apiClient = new ApiClient(user)
    await apiClient.getAuthenticationToken()

    await Logger.Debug(`Creating client with email '${client.email}' for user '${user.email}'`)
    let request = ClientHelper.GetPostNewClientRequest()
    request.data = {
      'name': client.name,
      'email': client.email,
      'phone': client.phone,
      'company': client.company,
      'title': client.title,
      'message': client.message,
      'uninvited': !client.isInvite,
      'property_id': '',
      'list_id': await ClientHelper.GetGroupIdByName(apiClient._user, client.group)
    }
    await apiClient.executeRequest(request, true)
  }

}

export default ClientHelper