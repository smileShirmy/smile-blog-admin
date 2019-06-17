const articleRouter = {
  route: null,
  name: null,
  title: '用户管理',
  type: 'folder',
  icon: 'el-icon-user',
  filePath: 'views/user/',
  order: null,
  inNav: true,
  children: [
    {
      title: '用户列表',
      type: 'view',
      name: 'user-list',
      route: '/user/list',
      filePath: 'views/user/user-list.vue',
      inNav: true,
      icon: ''
    },
    {
      title: '新增用户',
      type: 'view',
      name: 'user-add',
      route: '/user/add',
      filePath: 'views/user/user-add.vue',
      inNav: true,
      icon: ''
    },
  ]
}

export default articleRouter
