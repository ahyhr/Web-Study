import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*
  安装axios
    - cnpm i axios -S
  引入
    - import axios from 'axios'
*/

import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//发送请求
// axios({
//   method:'get',
//   url: 'http://123.207.32.32:8000/home/multidata',
// }).then(res => {
//   console.log(res);
// })

// axios({
//   method:'get',
//   url: 'http://123.207.32.32:8000/home/data',
//   params: {
//     type: 'pop',
//     page: 1
//   }
// }).then(res =>{
//   console.log(res);
// })

//axios.all 发送请求
axios.all([axios({
  url: 'http://123.207.32.32:8000/home/multidata'
}), axios(
  {
    url: 'http://123.207.32.32:8000/home/data',
    params: {
      type: 'pop',
      page: 1
    }
  }
)])
  .then(axios.spread((res1, res2) => {
    console.log(res1);
    console.log(res2);
    console.log('请求完成');
  }))