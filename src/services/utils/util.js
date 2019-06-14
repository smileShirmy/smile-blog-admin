import { throttle } from 'lodash'

const Utils = {}

/**
 * 节流函数
 * @param {*} func  延时
 * @param {*} wait  延时
 */
Utils.throttle = (func, wait = 50) => throttle(func, wait)

/**
 * 返回 n 位的随机字符串
 * @param {Number} n
 */
Utils.getRandomStr = (n = 6) => {
  let str = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  for (let i = 0; i < n; i += 1) {
    str += chars.charAt(Math.floor(Math.random() * 62))
  }
  return str
}

export default Utils