const adminRouter = {
  route: null,
  name: null,
  title: '文章管理',
  type: 'folder',
  icon: 'el-icon-document-copy',
  filePath: 'views/article/',
  order: null,
  inNav: true,
  children: [
    {
      title: '添加文章',
      type: 'view',
      name: 'article-add',
      route: '/article/add',
      filePath: 'views/article/article-add.vue',
      inNav: true,
      icon: ''
    },
    {
      title: '文章列表',
      type: 'view',
      name: 'article-list',
      route: '/article/list',
      filePath: 'views/article/article-list.vue',
      inNav: true,
      icon: ''
    }
  ]
}

export default adminRouter
