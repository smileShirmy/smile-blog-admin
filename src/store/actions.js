import * as types from './mutation-types'
import { removeToken } from '@/services/utils/cookie'

export default {
  loginOut({ commit }) {
    removeToken()
    commit(types.REMOVE_LOGINED, false)
  }
}