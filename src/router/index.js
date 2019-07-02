import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import appConfig from '@/config/index'
import store from '../store'

Vue.use(Router)

// 判断是否需要登录访问
let isLoginRequired = (routeName) => {
  let { notLoginRoute } = appConfig
  const notLoginMark = {}

  // 构建标记对象
  if (Array.isArray(notLoginRoute)) {
    for (let i = 0; i < notLoginRoute.length; i += 1) {
      notLoginMark[notLoginRoute[i].toString()] = true
    }
  }

  notLoginRoute = null // 释放内存

  // 重写初始化函数
  isLoginRequired = (name) => {
    if (!name) {
      return true
    }
    // 处理 Symbol 类型
    const target = (typeof name === 'symbol') ? name.description : name
    return !(notLoginMark[target])
  }

  return isLoginRequired(routeName)
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({
    y: 0
  })
})

router.beforeEach((to, from, next) => {

  if (isLoginRequired(to.name) && !store.state.login) {
    next({ path: '/login' })
    return
  }

  if (to.meta.title) {
    document.title = to.meta.title
  }

  next()
})

export default router
