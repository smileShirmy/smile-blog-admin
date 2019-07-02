import {
  get,
  _delete
} from '@/services/plugins/axios'

class Message {
  // 获取所有留言
  async getMessages(page = 0) {
    const res = await get(`v1/message/messages?page=${page}`)
    return res
  }

  // 删除某条留言
  async deleteMessage(id) {
    const res = await _delete(`v1/message?id=${id}`)
    return res
  }
}

export default new Message()