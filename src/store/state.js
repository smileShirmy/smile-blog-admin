import stageConfig from '@/config/stage'
import AppConfig from '@/config/index'

export default {
  defaultRoute: AppConfig.defaultRoute || '/about',
  sideBarLevel: AppConfig.sideBarLevel || 3,

  // 舞台配置
  stageConfig,
}