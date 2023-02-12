import Vue from 'vue'
import Vuex from 'vuex'
import {request} from '../network/request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 5,
    list: []
  },
  mutations: {
    plus(state){
      state.count++;
    },
    minus(state){
      state.count--;
    },
    pudata(state,data){
      state.list = data.data.data.banner.list;
    }
  },
  actions: {
    async getImgList(context){
      const data = await request({
        url: '/home/multidata'
      })
      context.commit('pudata',data)
    }
  },
  modules: {
  }
})
