import * as types from './mutation-types'
import axios from 'axios'
import utils from './utils'


var headers = {
    'Content-Type': 'application/json',
    'x-access-token': ''
}

var configureHeader = function (accessToken) {
  var headers = {
      'Content-Type': 'application/json',
      'x-access-token': accessToken
  }
  return headers
}

export const getRequests = ({ commit }, requestPayload) => {
  headers = configureHeader(utils.getAccessToken())
  console.log(headers['x-access-token'])
  var user_id = utils.getUserID()
  return new Promise((resolve, reject) => {
    axios.get(`http://127.0.0.1:3000/requests?ts=${requestPayload.return_ts}&page=${requestPayload.page}&per_page=${requestPayload.per_page}&staffID=${user_id}`,
       { headers })
      .then(result => {
        commit(types.GET_REQUEST, result.data)
        resolve(result.data)
      }).catch(err => {
        reject(err)
      })
  })
}

export const getUpdatedRequests = ({ commit }, requestPayload) => {
  headers = configureHeader(utils.getAccessToken())
  var user_id = utils.getUserID()

  var ts = 0
  var fetchRefreshRequestAPI = function () {
    return new Promise((resolve, reject) => {
      axios.get(`http://127.0.0.1:3000/requests/refresh?ts=${ts}&staffID=${user_id}`,
         { headers })
        .then(result => {
          if (result.status === 200) {
            ts = result.data.return_ts
            commit(types.GET_REQUEST, result.data)
            resolve(result.data)
          }
        }).catch(err => {
          reject(err)
        }).then(() => {
          fetchRefreshRequestAPI()
        })
    })
  }
  fetchRefreshRequestAPI()

}

export const setupWS = ({ commit }, requestPayload) => {
  return new Promise((resolve, reject) => {
    window.WebSocket = window.WebSocket || window.MozWebSocket
    var clientSocket = new WebSocket('ws://localhost:40510');

    clientSocket.onopen = function () {
        clientSocket.send('hello server');
    }

    clientSocket.onmessage = function (e) {
      // var data = JSON.parse(e.data);
      resolve(JSON.parse(e.data))
    }
  })
}

export const updateRequestGeocode = ({commit}, requestPayload) => {
  headers = configureHeader(utils.getAccessToken())
  return new Promise((resolve, reject) => {
    axios.put(`http://127.0.0.1:3000/requests/${requestPayload.ID}/geocode`, requestPayload, { headers })
      .then(result => {
        commit(types.UPDATE_REQUEST, result.data)
        resolve(result.data)
      }).catch(err => {
        reject(err)
      })
  })
}

export const sendRequestForDrivers = ({commit}, requestPayload) => {
  headers = configureHeader(utils.getAccessToken())
  return new Promise((resolve, reject) => {
    axios.post(`http://127.0.0.1:3003/requests`, requestPayload, { headers })
      .then(result => {
        commit(types.UPDATE_REQUEST, result.data)
        resolve(result.data)
      }).catch(err => {
        reject(err)
      })
  })
}

export const updateRequestStatus = ({commit}, requestPayload) => {
  headers = configureHeader(utils.getAccessToken())
  return new Promise((resolve, reject) => {
    axios.put(`http://127.0.0.1:3000/requests/${requestPayload.ID}/status`, requestPayload, { headers })
      .then(result => {
        commit(types.UPDATE_REQUEST, result.data)
        resolve(result.data)
      }).catch(err => {
        reject(err)
      })
  })
}

export const getRequestDetail = ({ commit }, requestPayload) => {
  headers = configureHeader(utils.getAccessToken())
  return new Promise((resolve, reject) => {
    axios.get(`http://127.0.0.1:3000/requests/${requestPayload.ID}`, { headers })
      .then(result => {
        commit(types.REQUEST_DETAIL, result.data)
        resolve(result.data)
      }).catch(err => {
        reject(err)
      })
  })
}

export const loginRequest = ({commit}, userPayload) => {
  headers = configureHeader(utils.getAccessToken())
  return new Promise((resolve, reject) => {
    axios.post(`http://127.0.0.1:3000/login`, userPayload)
      .then(result => {
        commit(types.USER, result.data)
        resolve(result.data)
      }).catch(err => {
        reject(err)
      })
  })
}

export const getUserInfo = ({commit}, userPayload) => {
  headers = configureHeader(utils.getAccessToken())
  return new Promise((resolve, reject) => {
    axios.get(`http://127.0.0.1:3000/users/${userPayload.ID}`, { headers })
      .then(result => {
        commit(types.USER, result.data)
        resolve(result.data)
      }).catch(err => {
        reject(err)
      })
  })
}


export const signupRequest = ({commit}, userPayload) => {
  headers = configureHeader(utils.getAccessToken())
  return new Promise((resolve, reject) => {
    axios.post(`http://127.0.0.1:3000/signup`, userPayload)
      .then(result => {
        commit(types.USER, result.data)
        resolve(result.data)
      }).catch(err => {
        reject(err)
      })
  })
}
