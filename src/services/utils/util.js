import { throttle } from 'lodash'

const Utils = {}

/**
 * 节流函数
 * @param {*} func  延时
 * @param {*} wait  延时
 */

Utils.throttle = (func, wait = 50) => throttle(func, wait)

export default Utils