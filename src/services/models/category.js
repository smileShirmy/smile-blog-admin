import {
  get,
  post,
  put,
  _delete
} from '@/services/plugins/axios'

class Category {
  // 新增分类
  async createCategory(category) {
    const res = await post('v1/category', category)
    return res
  }

  // 编辑分类
  async updateCategory(id, category) {
    const res = await put(`v1/category?id=${id}`, category)
    return res
  }

  // 获取所有分类
  async getCategories() {
    const res = await get('v1/category/categories')
    return res
  }

  // 删除某个分类
  async deleteCategory(id) {
    const res = await _delete(`v1/category?id=${id}`)
    return res
  }
}

export default new Category()