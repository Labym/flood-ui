// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import './styles/common.scss'
import router from './router/index'
import store from './store'
import './api/mock/index'
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
