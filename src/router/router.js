import Layout from '../components/layout'
import Login from '../pages/login'
const _import = require('./_import')
export default [{
  path: '/',
  name: '主页',
  redirect: '/wel'
}, {
  path: '/wel',
  component: Layout,
  redirect: '/wel/index',
  children: [{
    path: 'index',
    name: '首页',
    component: _import('wel')
  }]
}, {
  path: '/login',
  component: Login,
}]
