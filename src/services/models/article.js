import {
  get,
  post,
  put,
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

  // 设为公开 或 私密
  async updateArticlePublic(id, params) {
    const res = await put(`v1/article/public?id=${id}`, params)
    return res
  }

  // 设为精选
  async updateArticleStar(id, params) {
    const res = await put(`v1/article/star?id=${id}`, params)
    return res
  }

  // 获取该文章的所有评论
  async getComments(id) {
    const res = await get(`v1/article/get/comment?articleId=${id}`)
    return res
  }

  // 删除某条评论
  async deleteComment(id) {
    const res = await _delete(`v1/article/del/comment?id=${id}`)
    return res
  }

  // 获取某篇文章的内容
  async getContent(id) {
    const res = await get(`v1/article?id=${id}`)
    return res
  }

  // 更新某篇文章
  async updateArticle(article) {
    const res = await put('v1/article', article)
    return res
  }
}

export default new Article()