// 按需引入loadsh
import throttle from 'lodash/throttle'

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


/**
 * 根据长度截取先使用字符串，超长部分追加…
 * @param {String} str 对象字符串
 * @param {Number} len 目标字节长度
 * @return 处理结果字符串
 */
Utils.cutString = (str, len) => {
  if (str.length * 2 <= len) {
    return str
  }
  let strlen = 0
  let s = ''
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-line
    s += str.charAt(i)
    if (str.charCodeAt(i) > 128) {
      strlen += 2
      if (strlen >= len) {
        return `${s.substring(0, s.length - 1)}...`
      }
    } else {
      strlen += 1
      if (strlen >= len) {
        return `${s.substring(0, s.length - 2)}...`
      }
    }
  }
  return s
}

function insertItem(item, arr) {
  const { order } = item
  if (typeof arr[order] !== 'number') {
    arr[order] = item
    return
  }
  let moveBegin
  let moveEnd
  let pos
  let i = order + 1

  while (arr[i]) {
    if (arr[i].order > order) {
      if (!moveBegin) {
        moveBegin = i
        pos = i
      }
    }
    i += 1
  }

  if (moveBegin) {
    moveEnd = i
  } else {
    pos = i
  }

  if (!moveEnd) {
    arr[pos] = item
    return
  }

  // 需要移动
  for (let i = moveEnd; i >= moveBegin; i -= 1) {
    arr[i + 1] = arr[i]
  }
  arr[pos] = item
}

/**
 * 根据数组的 order 字段排序
 * @param {Array} source
 */
Utils.sortByOrder = (source = []) => {
  if (!Array.isArray(source)) {
    // eslint-disable-next-line no-console
    console.error('sortByOrder 传入参数不符合要求, 应为数组', source)
    return source
  }
  const tmp = []
  let target = []

  // 将带排序的子项添加进临时数组 tmp
  for (let i = 0; i < source.length; i += 1) {
    if (typeof source[i].order !== 'number') {
      continue
    }
    let { order } = source[i]
    // 支持设置倒数顺序
    if (order < 0) {
      order = source.length + order
      if (order < 0) {
        order = 0
      }
    }

    // 确保整数
    source[i].order = Math.floor(order)
    
    // 插入临时数组
    insertItem(source[i], tmp)
  }

  // 合并临时数组和原数组
  for (let i = 0, j = 0; i < source.length; i += 1) {
    if (typeof source[i].order === 'number') {
      continue
    }
    // 找需要填的坑
    while (tmp[j]) {
      j += 1
    }
    tmp[j] = source[i]
  }
  // 筛除空隙
  target = tmp.filter(item => !!item)
  return target
}

/**
 * 格式化时间
 * @param {Date} timestamp    时间对象
 * @param {String} formats      格式 
 */
Utils.timestampToTime = (timestamp, formats) => {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  formats = formats || 'Y-m-d H:i:s';

  const zero = function (value) {
      if (value < 10) {
          return '0' + value;
      }
      return value;
  };

  // const myDate = timestamp * 1000 ? new Date(timestamp * 1000): new Date();
  const myDate = new Date(timestamp)

  const year = myDate.getFullYear()
  const month = zero(myDate.getMonth() + 1)
  const day = zero(myDate.getDate())

  const hour = zero(myDate.getHours())
  const minute = zero(myDate.getMinutes())
  const second = zero(myDate.getSeconds())

  return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
      return ({
          Y: year,
          m: month,
          d: day,
          H: hour,
          i: minute,
          s: second
      })[matches]
  })
}

export default Utils