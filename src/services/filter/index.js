import Utils from '../utils/util'

export default {
  filterTitle(value, len = 9) {
    return Utils.cutString(value, len)
  },
}