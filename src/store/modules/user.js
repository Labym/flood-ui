/* eslint-disable eqeqeq */
import {getToken, setToken, removeToken} from '@/util/auth'
import {setStore, getStore, removeStore} from '@/util/store'
import {validatenull} from '@/util/validate'
import {encryption} from '@/util/util'
import {authenticate} from '@/api/user'
import {currentUserMenus} from '@/api/menus'
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
      const menus = [
        {
          'id': 1,
          'parentId': -1,
          'children': [
            {
              'id': 2,
              'parentId': 1,
              'children': [],
              'icon': 'icon-yonghuguanli',
              'name': '用户管理',
              'url': '',
              'spread': false,
              'path': '/admin/user',
              'href': '/admin/user',
              'authority': null,
              'redirect': null,
              'code': null,
              'type': '0',
              'label': '用户管理',
              'sort': 2
            },
            {
              'id': 3,
              'parentId': 1,
              'children': [],
              'icon': 'icon-caidanguanli',
              'name': '菜单管理',
              'url': '',
              'spread': false,
              'path': '/admin/aaaa',
              'href': '/admin/aaaa',
              'authority': null,
              'redirect': null,
              'code': null,
              'type': '0',
              'label': '菜单管理',
              'sort': 3
            }
          ],
          'icon': 'icon-xitongguanli',
          'name': '系统管理',
          'url': null,
          'spread': false,
          'href': '/admin',
          'authority': null,
          'redirect': null,
          'code': null,
          'type': '0',
          'label': '系统管理',
          'sort': 1
        }
      ]

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
    SET_MENU: (state, menu) => {
      console.log(menu)
      state.menu = menu
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
