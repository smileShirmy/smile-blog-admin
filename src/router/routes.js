import Home from '@/views/home/home'
import homeRouter from './home-router'

const routes = [
  {
    path: '',
    name: 'Home',
    redirect: '/about',
    component: Home,
    children: [
      ...homeRouter
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login')
  },
  {
    redirect: '/404',
    path: '*'
  }
]

export default routes
