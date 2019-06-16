import Utils from "@/services/utils/util";
import article from './article'

/**
 * @param {String} type       类型 folder： 有子路由 / tab 在右侧以 tab： 形式展示 / view： 直接展示页面
 * @param {String} title      页面 title / sidebar title
 * @param {Symbol} name       路由名称
 * @param {String} route      路由路径
 * @param {String} filePath   文件路径
 * @param {String} icon       图标 iconfont 类名 / 图片路径
 * @param {String} order      路由排序
 * @param {String} inNav      是不是一个路由
 * @param {Array}  children   子菜单
 */

let homeRouter = [
  {
    title: '概览',
    type: 'view',
    name: Symbol('about'),
    route: '/about',
    filePath: 'views/about/about.vue',
    inNav: true,
    icon: 'el-icon-info',
    order: 0,
  },
  {
    title: '404',
    type: 'view',
    name: Symbol('404'),
    route: '/404',
    filePath: 'views/error-page/404.vue',
    inNav: false,
    icon: ''
  },
  article
]

// 处理顺序
homeRouter = Utils.sortByOrder(homeRouter)

// 递归使用 Symbol 处理 name 字段, 保证唯一性
const deepReduceName = (target) => {
  if (Array.isArray(target)) {
    target.forEach((item) => {
      if (typeof item !== 'object') {
        return
      }
      deepReduceName(item)
    })
    return
  }
  if (typeof target === 'object') {
    if (typeof target.name !== 'symbol') {
      target.name = target.name || Utils.getRandomStr()
      target.name = Symbol(target.name)
    }

    if (Array.isArray(target.children)) {
      target.children.forEach((item) => {
        if (typeof item !== 'object') {
          return
        }
        deepReduceName(item)
      })
    }
  }
}

deepReduceName(homeRouter)

export default homeRouter