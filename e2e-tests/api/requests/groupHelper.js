'use strict'

import ApiClient from '../apiClient'

class GroupHelper {

  static GetGroups () {
    return {
      method: 'GET',
      pathEndpoint: '/api/lists'
    }
  }


  static async GetGroupIdByName (user, groupName) {
    console.log(user)
    // let apiClient = new ApiClient(user)
    // await apiClient.getAuthenticationToken()

    await Logger.Debug(`Getting groupId by name '${groupName}' for user '${user.email}'`)
    let request = GroupHelper.GetGroups()

    let groupId
    let response = await user.executeRequest(request, true)

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

export default GroupHelper