import stageConfig from '@/config/stage'

// 遍历配置树，子节点作为路由
function deepTravel(config, func) {
  if (Array.isArray(config)) {
    config.forEach(subConfig => {
      deepTravel(subConfig, func)
    })
  } else if (config.children) {
    config.children.forEach(subConfig => {
      deepTravel(subConfig. func)
    })
  } else {
    func(config)
  }
}

const homeRouter = []

// 构建路由
deepTravel(stageConfig, (viewConfig) => {
  const viewRouter = {}
  viewRouter.path = viewConfig.route
  viewRouter.name = viewConfig.name
  viewRouter.component = () => import(`@/${viewConfig.filePath}`)
  viewRouter.meta = {
    title: viewConfig.title,
    icon: viewConfig.icon,
    right: viewConfig.right,
    type: viewConfig.type
  }
  homeRouter.push(viewRouter)
})

export default homeRouter