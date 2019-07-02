import {
  get
} from '@/services/plugins/axios'

class Category {
  // 获取所有分类
  async getCategories() {
    const res = await get('v1/category/categories')
    return res
  }
}

export default new Category()