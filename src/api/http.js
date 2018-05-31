/**
 *
 * http配置
 *
 */

import axios from 'axios'
import store from '../store'
import router from '../router/router'
import {getToken, setToken, removeToken} from '@/util/auth'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
// 超时时间
axios.defaults.timeout = 30000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
NProgress.configure({showSpinner: false})// NProgress Configuration
let msg
// HTTPrequest拦截
axios.interceptors.request.use(config => {
  config.baseURL = 'http://127.0.0.1:8088'
  NProgress.start() // start progress bar
  config.headers['Content-Type'] = 'application/json'
  console.log(store.getters.access_token)
  if (store.getters.access_token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})
// HTTPresponse拦截
axios.interceptors.response.use(data => {
  NProgress.done()
  return data
}, error => {
  NProgress.done()
  let errMsg = error.toString()
  let code = errMsg.substr(errMsg.indexOf('code') + 5)
  // Message({
  //   message: errorCode[code] || errorCode['default'],
  //   type: 'error'
  // })
  return Promise.reject(new Error(error))
})

export default axios
