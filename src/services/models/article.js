import {
  get,
  post,
  _delete
} from '@/services/plugins/axios'

class Article {
  // 创建文章
  async createArticle(article) {
    const res = await post('v1/article', article)
    return res
  }

  // 获取所有文章
  async getArticles(params) {
    const res = await get('v1/article/articles', params)
    return res
  }

  // 删除某篇文章
  async deleteArticle(id) {
    const res = await _delete(`v1/article?id=${id}`)
    return res
  }
}

export default new Article()