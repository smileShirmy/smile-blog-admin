import {
  get,
  post,
  put,
  _delete
} from '@/services/plugins/axios'

class Blog {
  // 创建友链
  async createFriend(friend) {
    const res = await post('v1/blog/friend', friend)
    return res
  }

  // 获取所有友链
  async getFriends() {
    const res = await get('v1/blog/friend/friends')
    return res
  }

  // 更新友链
  async updateFriend(id, friend) {
    const res = await put(`v1/blog/friend?id=${id}`, friend)
    return res
  }

  // 删除友链
  async deleteFriend(id) {
    const res = _delete(`v1/blog/friend?id=${id}`)
    return res
  }
}

export default new Blog()