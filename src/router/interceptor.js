import {eq, isEmpty} from 'lodash'
import store from '../store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
export const filter = (router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    if (eq('/login', to.path)) {
      next()
      NProgress.done()
      return
    }

    console.log(store.getters.access_token)
    if (!store.getters.access_token) {
      next({path: '/login'})
    }
    if (isEmpty(store.getters.menu)) {
      console.log('no menus')
    }
    next()
  })
}
