import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  routerMode
} from '@/config/env'
import store from '@/store'
import {
  formatRoutes, setTitle
} from '@/util/util'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import Layout from '../components/layout/index'
import baseRouter from './router'
const _import = require('./_import')
Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
})
const asyncRouterMap = [
  {
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [
      {
        path: 'index',
        name: '首页',
        component: _import('wel')
      }
    ]
  }, {
    path: '/admin',
    component: Layout,
    redirect: '/admin/user',
    children: [
      {
        path: 'user',
        name: '个人信息',
        component: _import('resource/resourceList')
      }, {
        path: 'aaaa',
        name: '个人信息',
        component: _import('index')
      }
    ]
  },
].concat(baseRouter)

router.addRoutes(asyncRouterMap)
export default router
