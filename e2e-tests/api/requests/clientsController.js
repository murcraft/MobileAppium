'use strict'

class ClientsController {

  static GetDeleteClientByIdRequest (clientId) {
    return {
      resource: `/api/clients/${clientId}`,
      options: {
        method: 'DELETE'
      }
    }
  }
  static GetGetClientsRequest () {
    return {
      resource: '/api/clients',
      options: {
        method: 'GET'
      }
    }
  }
  static GetPostClientsRequest () {
    return {
      resource: '/api/clients',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    }
  }

  static GetClientGroupsRequest () {
    return {
      resource: '/api/lists',
      options: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    }
  }
}

module.exports = ClientsController//export default ClientsController