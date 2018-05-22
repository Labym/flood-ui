import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import errLog from './modules/errLog'
import tags from './modules/tags'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    common,
    errLog,
    tags,
    user,
  },
  getters,
})

export default store
