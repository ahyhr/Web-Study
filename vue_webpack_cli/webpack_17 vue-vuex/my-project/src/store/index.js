import Vue from 'vue'
import Vuex from 'vuex'

import { ADDD,SUBB } from './mutations-types'

Vue.use(Vuex)


const MutationsMod = {
  state:{
    counter:10,
    students:[
      {id:1,name:'小红',age:24},
      {id:2,name:'小绿',age:19},
      {id:3,name:'小蓝',age:14},
      {id:4,name:'小黄',age:29},
    ],
  },
  mutations:{
    [ADDD](state){
      state.counter++;
    },
    [SUBB](state){
      state.counter--;
    },
    incrementCounts(state,count){
      state.counter += count;
    },
    addStudent(state,payload){
      //payload 从传入对象中取出
      state.students.push(payload.stu);
      console.log(state);
    }
  },
  actions:{},
  getters:{}
}

const ActionsMod = {
  state:{
  },
  mutations:{
  },
  actions:{
    aupdataInfo(context,arr){
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          //使用commit 经过 mutations  (vue.js devtools 插件才能检测到)
          context.rootState.students.push(arr); //rootState 根
          context.commit('updataInfo');
          console.log(context);
          resolve('actions更新完成');
        }, 2000);
      })
    }
  },
  getters:{}
}

export default new Vuex.Store({
  state: {
    //state 所有组件都可以使用 公共
    counter:10,
    students:[
      {id:1,name:'小红',age:24},
      {id:2,name:'小绿',age:19},
      {id:3,name:'小蓝',age:14},
      {id:4,name:'小黄',age:29},
    ],
    info:{
      name: 'yhr',
      age: 21,
      sex: '男',
    }
  },
  mutations: {
    //定义方法
    updataInfo(state,isop){
      // state.info.name = 'aaa';
      //Vue.set() Vue.delete  响应式添加/删除 属性
      if (isop) {
      Vue.set(state.info,'address','安徽');
      } else {
      Vue.delete(state.info,'address');
      }
    }
  },
  actions: {
    //处理异步操作
    // aupdataInfo(context,arr){
    //   return new Promise((resolve,reject) => {
    //     setTimeout(() => {
    //       //使用commit 经过 mutations  (vue.js devtools 插件才能检测到)
    //       context.state.students.push(arr);
    //       context.commit('updataInfo');
    //       console.log(context);
    //       resolve('actions更新完成');
    //     }, 2000);
    //   })
    // }
  },
  modules: {
    //将store中的对象,按模块进行管理
    MutationsMod,
    ActionsMod
  },
  getters:{
    //从store中,获取一些state异变后的状态 类似计算属性

    //counter 的平方
    powerCounter(state){
      return state.counter * state.counter;
    },
    //大于18的学生
    more20Age(state){
      return state.students.filter(n => n.age >= 20);
    },
    //可传参 getter
    more20AgeLength(state,getter){
      return getter.more20Age.length;
    },
    //自定义岁数 可传age
    moreAge(state){
      return function(age){
        return state.students.filter(n => n.age >= age);
      }
    },
  }
})
