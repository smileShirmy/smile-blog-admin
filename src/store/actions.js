import * as types from './mutation-types'
import { removeToken } from '@/services/utils/cookie'

export default {
  setAuthorAndState({ commit }, author) {
    // 设置为已登录状态
    commit(types.SET_LOGIN, true)
    // 设置用户状态
    commit(types.SET_AUTHOR, author)
  },

  loginOut({ commit }) {
    removeToken()
    commit(types.REMOVE_LOGIN, false)
  }
}