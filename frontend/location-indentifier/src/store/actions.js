import * as types from './mutation-types'
import axios from 'axios'

var headers = {
    'Content-Type': 'application/json',
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklEIjoxLCJVc2VybmFtZSI6Im1pbmhsdWFuIiwiUGFzc3dvcmQiOiI2MDQwMjQ3ZjMwMmU0ZWI0OTRiZGZiYmNjZDg4NWE3ZiIsIlJlZnJlc2hUb2tlbiI6IjQ4N2Y3YjIyZjY4MzEyZDJjMWJiYzkzYjFhZWE0NDViIiwiSURfUm9sZXMiOjJ9LCJpYXQiOjE1NDMwNzM3MzIsImV4cCI6MTU0MzE2MDEzMn0.41VU-6wXfriYATxkchzsa-poraCrikKDVCukWQNrqUE'
}

export const getRequests = ({ commit }, requestPayload) => {
  return new Promise((resolve, reject) => {
    axios.get(`http://127.0.0.1:3000/requests?ts=${requestPayload.return_ts}&page=${requestPayload.page}&per_page=${requestPayload.per_page}`, { headers })
      .then(result => {
        commit(types.GET_REQUEST, result.data)
        resolve(result.data)
      }).catch(err => {
        reject(err)
      })
  })

}

export const setupWS = ({ commit }, requestPayload) => {
  return new Promise((resolve, reject) => {
    window.WebSocket = window.WebSocket || window.MozWebSocket
    var clientSocket = new WebSocket('ws://localhost:40510');

    clientSocket.onopen = function () {
        console.log('connected');
        clientSocket.send('hello server');
    }

    clientSocket.onmessage = function (e) {
      console.log(e.data);
      // var data = JSON.parse(e.data);
      resolve(JSON.parse(e.data))
    }
  })

}
