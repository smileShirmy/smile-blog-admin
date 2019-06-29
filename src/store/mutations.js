import * as types from './mutation-types'

export default {
  [types.SET_REFRESH_OPTION](state, option) {
    state.refreshOptions = option
  },

  [types.REMOVE_LOGINED](state) {
    state.logined = false
    state.user = null
  },
}
