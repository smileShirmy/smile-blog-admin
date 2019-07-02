import {
  get,
  post,
  put,
  _delete
} from '@/services/plugins/axios'

class Tag {
  async createTag(tag) {
    const res = await post('v1/tag', tag)
    return res
  }

  // 获取所有标签
  async getTags() {
    const res = await get('v1/tag/tags')
    return res
  }

  // 更新标签
  async updateTag(id, tag) {
    const res = await put(`v1/tag?id=${id}`, tag)
    return res
  }

  // 删除标签
  async deleteTag(id) {
    const res = _delete(`v1/tag?id=${id}`)
    return res
  }
}

export default new Tag()