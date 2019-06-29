import stageConfig from '@/config/stage'
import AppConfig from '@/config/index'

export default {
  logined: false, // 是否登录
  user: null, // 当前用户
  defaultRoute: AppConfig.defaultRoute || '/about',
  sideBarLevel: AppConfig.sideBarLevel || 3,

  // 舞台配置
  stageConfig,
}