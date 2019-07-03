import {
  post,
  get,
  put,
  _delete
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

  // 获取某个作者的信息
  static async getAuthorInfo() {
    return await get('v1/author/info')
  }

  // 获取所有作者
  static async getAuthors() {
    return await get('v1/author/authors')
  }

  // 获取除了管理员之外的所有作者
  static async getAdminAuthors() {
    return await get('v1/author/authors/admin')
  }

  // 创建作者
  static async createAuthor(author) {
    let res = await post('v1/author', author)
    return res
  }

  // 更新作者信息
  static async updateAuthor(author, id) {
    let res = await put(`v1/author/info?id=${id}`, author)
    return res
  }

  // 更换作者密码
  static async changePassword(password, id) {
    let res = await put(`v1/author/password?id=${id}`, password)
    return res
  }

  // 更换自己的密码
  static async changeSelfPassword(data) {
    let res = await put('v1/author/password/self', data)
    return res
  }

  // 删除作者
  static async deleteAuthor(id) {
    let res = await _delete(`v1/author?id=${id}`)
    return res
  }
}