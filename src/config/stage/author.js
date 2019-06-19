const articleRouter = {
  route: null,
  name: null,
  title: '作者管理',
  type: 'folder',
  icon: 'el-icon-user',
  filePath: 'views/author/',
  order: null,
  inNav: true,
  children: [
    {
      title: '作者列表',
      type: 'view',
      name: 'author-list',
      route: '/author/list',
      filePath: 'views/author/author-list.vue',
      inNav: true,
      icon: ''
    },
    {
      title: '新增作者',
      type: 'view',
      name: 'author-add',
      route: '/author/add',
      filePath: 'views/author/author-add.vue',
      inNav: true,
      icon: ''
    },
  ]
}

export default articleRouter
