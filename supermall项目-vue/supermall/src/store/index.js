import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

const state = {
  cartList: []
}

export default new Vuex.Store({
  //将state,mutations,actions进行抽取
  state,
  mutations,
  actions,
  getters,
  modules: {

  },
})
