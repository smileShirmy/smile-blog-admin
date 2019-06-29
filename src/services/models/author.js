import {
  post
} from '@/services/plugins/axios'
import { saveTokens } from '../utils/cookie'

export default class Author {
  static async getToken(name, password) {
    const tokens = await post('v1/author/login', {
      name,
      password
    })
    saveTokens(tokens.accessToken, tokens.refreshToken)
    return tokens
  }
}