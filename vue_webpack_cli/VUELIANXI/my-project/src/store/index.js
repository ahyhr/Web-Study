import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 10
  },
  mutations: {
    //方法
    changeCount(state,payload){
      if (payload.event.target.value == '-') {
        state.count -= payload.count;
      } else {
        state.count += payload.count;
      }
    },
  },
  actions: {
  },
  modules: {
  },
  getters:{
    quCount(state){
      return state.count * state.count;
    }
  }
})
