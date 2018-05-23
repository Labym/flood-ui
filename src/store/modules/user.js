/* eslint-disable eqeqeq */
import { getToken, setToken, removeToken } from '@/util/auth'
import { setStore, getStore, removeStore } from '@/util/store'
import { validatenull } from '@/util/validate'
import { encryption } from '@/util/util'

const user = {
  state: {
    userInfo: {},
    permission: {},
    roles: [],
    menu: [],
    menuAll: [],
    token: getStore({ name: 'token' }) || '',
  },
  actions: {
    // 根据用户名登录
    LoginByUsername ({ commit, state, dispatch }, userInfo) {
      const user = encryption({
        data: userInfo,
        type: 'Aes',
        key: 'avue',
        param: ['useranme', 'password']
      })
      // return new Promise((resolve, reject) => {
      //   loginByUsername(user.username, user.password, userInfo.code, userInfo.redomStr).then(res => {
      //     const data = res.data
      //     commit('SET_TOKEN', data)
      //     commit('DEL_ALL_TAG')
      //     commit('CLEAR_LOCK')
      //     setToken(data)
      //     resolve()
      //   })
      // })
    },
    // 根据手机号登录
    LoginByPhone ({ commit, state, dispatch }, userInfo) {
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
    GetTableData ({ commit, state, dispatch }, page) {
      // return new Promise((resolve, reject) => {
      //   getTableData(page).then(res => {
      //     const data = res.data
      //     resolve(data)
      //   })
      // })
    },
    GetUserInfo ({ commit, state, dispatch }) {
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
    LogOut ({ commit, state }) {
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
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('DEL_ALL_TAG')
        commit('CLEAR_LOCK')
        removeToken()
        resolve()
      })
    },
    // 获取系统菜单
    GetMenu ({ commit }, parentId) {
      const menus = [{
        id: 1,
        label: '首页',
        href: '/wel/index',
        icon: 'icon-huanyingye',
        meta: {},
        children: [],
      }, {
        id: 13,
        label: '权限测试页',
        href: '/role/index',
        icon: 'icon-quanxian',
        meta: {
          roles: ['admin'],
        },
        children: [],
      }, {
        id: 2,
        label: '系统管理1',
        href: '',
        icon: 'icon-iframe',
        component: 'Layout',
        path: '/settings',
        meta: {},
        children: [{
          id: 3,
          label: '资源管理',
          href: 'resource/resourceList',
          component: 'resource/resourceList',
          icon: 'icon-baidu',
          path: 'resource',
          children: [],
        }, {
          id: 4,
          label: '搜狐',
          href: 'http://www.shouhu.com',
          icon: 'icon-souhu',
          children: [],
        }, {
          id: 5,
          label: '360',
          href: 'http://www.360.com',
          icon: 'icon-msnui-360',
          children: [],

        }]
      }, {
        id: 6,
        label: '表格CRUD',
        href: '/table/index',
        icon: 'icon-biaoge',
        meta: {},
        children: []
      }, {
        id: 9,
        label: '表单CRUD',
        href: '/form/index',
        icon: 'icon-biaodan',
        meta: {},
        children: []
      }, {
        id: 7,
        label: '阿里图标',
        href: '/iconfont/index',
        icon: 'icon-changyonglogo27',
        meta: {},
        children: []
      }, {
        id: 9,
        label: '系统管理',
        icon: 'icon-liuliangyunpingtaitubiao08',
        meta: {},
        children: [
          {
            id: 10,
            label: '用户管理',
            href: '/admin/user',
            icon: 'icon-yonghuguanli',
            children: []
          }, {
            id: 11,
            label: '角色管理',
            href: '/admin/role',
            icon: 'icon-jiaoseguanli',
            children: []
          },
          {
            id: 12,
            label: '菜单管理',
            href: '/admin/menu',
            icon: 'icon-caidanguanli',
            children: []
          }
        ]
      }, {
        id: 8,
        label: '综合错误',
        href: '#',
        icon: 'icon-cuowu',
        meta: {},
        children: [
          {
            id: 14,
            label: '错误日志',
            href: '/errlog/index',
            icon: 'icon-rizhi',
            children: []
          }, {
            id: 15,
            label: '错误页面',
            href: '/errlog/page',
            icon: 'icon-cuowutishitubiao',
            children: []
          }
        ]
      }
      ]
      menus.forEach(ele => {
        ele.children.forEach(child => {
          if (!validatenull(child.component)) child.path = `${ele.path}/${child.path}`
        })
      })
      commit('SET_MENU', menus)
    },
    // 获取全部菜单
    GetMenuAll ({ commit }) {
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
      setStore({ name: 'token', content: state.token, type: 'session' })
    },
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_MENU: (state, menu) => {
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
