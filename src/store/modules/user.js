/* eslint-disable eqeqeq */
import {isEmpty} from 'lodash'
import {getToken, setToken, removeToken} from '@/util/auth'
import {setStore, getStore, removeStore} from '@/util/store'
import {validatenull} from '@/util/validate'
import {encryption} from '@/util/util'
import {authenticate} from '@/api/user'
import {currentUserMenus} from '@/api/menus'
import router from '../../router/index'
import {initMenu} from '../../util/util'
const user = {
  state: {
    userInfo: {},
    permission: {},
    roles: [],
    menu: [],
    menuAll: [],
    token: getStore({name: 'token'}) || '',
  },
  actions: {
    // 根据用户名登录
    LoginByUsername ({commit, state, dispatch}, userInfo) {
      // const user = encryption({
      //   data: userInfo,
      //   type: 'Aes',
      //   key: 'avue',
      //   param: ['username', 'password']
      // })
      return new Promise((resolve, reject) => {
        authenticate(userInfo.username, userInfo.password, userInfo.captcha).then(res => {
          const data = res.data
          commit('SET_TOKEN', data.token)
          // commit('DEL_ALL_TAG')
          commit('CLEAR_LOCK')
          setToken(data.token)
          resolve()
        })
      })
    },
    // 根据手机号登录
    LoginByPhone ({commit, state, dispatch}, userInfo) {
      // return new Promise((resolve, reject) => {
      //   loginByUsername(userInfo.phone, userInfo.code).then(res => {
      //     const data = res.data
      //     commit('SET_TOKEN', data)
      //     commit('DEL_ALL_TAG')
      //     commit('CLEAR_LOCK')
      //     setToken(data)
      //     resolve()
      //   })
      // })
    },
    GetTableData ({commit, state, dispatch}, page) {
      // return new Promise((resolve, reject) => {
      //   getTableData(page).then(res => {
      //     const data = res.data
      //     resolve(data)
      //   })
      // })
    },
    GetUserInfo ({commit, state, dispatch}) {
      // return new Promise((resolve, reject) => {
      //   getUserInfo().then((res) => {
      //     const data = res.data
      //     commit('SET_USERIFNO', data.userInfo)
      //     commit('SET_ROLES', data.roles)
      //     commit('SET_PERMISSION', data.permission)
      //     resolve(data)
      //   })
      // })
    },
    // 登出
    LogOut ({commit, state}) {
      // return new Promise((resolve, reject) => {
      //   logout().then(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     commit('DEL_ALL_TAG')
      //     commit('CLEAR_LOCK')
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },
    // 注销session
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('DEL_ALL_TAG')
        commit('CLEAR_LOCK')
        removeToken()
        resolve()
      })
    },
    // 获取系统菜单
    GetMenu ({commit}, parentId) {
      return new Promise((resolve, reject) => {
        currentUserMenus().then((res) => {
          const data = res.data
          commit('SET_MENU', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      // menus.forEach(ele => {
      //   ele.children.forEach(child => {
      //     console.log(child)
      //     if (!validatenull(child.component)) {
      //       child.path = `${ele.path}/${child.path}`
      //     }
      //   })
      // })
    },
    // 获取全部菜单
    GetMenuAll ({commit}) {
      // return new Promise(resolve => {
      //   getMenuAll().then((res) => {
      //     const data = res.data
      //     commit('SET_MENU_ALL', data)
      //     resolve(data)
      //   })
      // })
    },

  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setStore({name: 'token', content: state.token, type: 'session'})
    },
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_MENU: (state, menus) => {
      let navs = []
      menus.root.forEach((menu) => {
        let nav = {id: menu.data.id, path: menu.data.url, name: menu.data.name, ...menu.data.extensions, children: []}
        if (!isEmpty(menu.children)) {
          menu.children.forEach((child) => {
            nav.children.push({id: child.data.id, path: child.data.url, name: child.data.name, ...child.data.extensions})
          })
        }
        navs.push(nav)
      })
      initMenu(router, navs)
      state.menu = navs
      setStore({
        name: 'menu',
        content: state.menu,
        type: 'session'
      })
    },
    SET_MENU_ALL: (state, menuAll) => {
      state.menuAll = menuAll
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = {}
      permission.forEach(ele => {
        state.permission[ele] = true
      })
    }
  }

}
export default user
