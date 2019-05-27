import Home from '@/views/home/home'

const Login = () => import('@/views/login/login')
const ErrorPage = () => import('@/views/error-page/404')

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    redirect: '/404',
    path: '*',
    component: ErrorPage
  }
]

export default routes
