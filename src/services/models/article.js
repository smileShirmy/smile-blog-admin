import {
  post
} from '@/services/plugins/axios'

class Article {
  async createArticle(article) {
    console.log(article)
    const res = await post('v1/article', article)
    return res
  }
}

export default new Article()