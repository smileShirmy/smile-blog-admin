const categoryRouter = {
  route: null,
  name: null,
  title: '分类管理',
  type: 'folder',
  icon: 'el-icon-collection-tag',
  filePath: 'views/category/',
  order: null,
  inNav: true,
  children: [
    {
      title: '分类管理',
      type: 'view',
      name: 'category',
      route: '/category/category',
      filePath: 'views/category/category.vue',
      inNav: true,
      icon: ''
    },
    {
      title: '标签管理',
      type: 'view',
      name: 'tag',
      route: '/category/tag',
      filePath: 'views/category/tag.vue',
      inNav: true,
      icon: ''
    }
  ]
}

export default categoryRouter
