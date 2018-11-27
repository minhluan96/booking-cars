import * as types from './mutation-types'

export const mutations = {
  [types.GET_REQUEST] (state, requestPayload) {
    state.requests = requestPayload
  },
  [types.UPDATE_REQUEST] (state, requestPayload) {
    state.requestItem = requestPayload
  },
  [types.REQUEST_DETAIL] (state, requestPayload) {
    state.requestItem = requestPayload
  },
  [types.USER] (state, userPayload) {
    state.user = userPayload
  }
}
