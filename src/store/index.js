import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import errLog from './modules/errLog'
import tags from './modules/tags'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    common,
    errLog,
    tags
  },
  getters,
})

export default store
