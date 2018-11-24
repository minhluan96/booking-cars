import * as types from './mutation-types'

export const mutations = {
  [types.GET_REQUEST] (state, requestPayload) {
    state.requests = requestPayload
  }
}
