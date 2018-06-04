import {eq} from 'lodash'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
export const filter = (router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    console.log(to)
    if (eq('/login', to.path)) {
      next()
      return
    }
    next()
  })
}
