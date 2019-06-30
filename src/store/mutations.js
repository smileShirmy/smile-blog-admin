import * as types from './mutation-types'

export default {
  [types.SET_REFRESH_OPTION](state, option) {
    state.refreshOptions = option
  },

  [types.REMOVE_LOGIN](state) {
    state.login = false
    state.user = null
  },

  [types.SET_LOGIN](state) {
    state.login = true
  },

  [types.SET_AUTHOR](state, payload) {
    state.author = payload
  }
}
