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

  //axios.defaults 默认全局设置
  // axios.defaults.baseURL = 'http://123.207.32.32:8000';
  // axios.defaults.timeout = 5000;


//axios.all 发送请求
// axios.all([axios({
//   url: '/home/multidata'
// }), axios(
//   {
//     url: '/home/data',
//     params: {
//       type: 'pop',
//       page: 1
//     }
//   }
// )])
//   .then(axios.spread((res1, res2) => {
//     console.log(res1);
//     console.log(res2);
//     console.log('请求完成');
//   }))


  //创建axios实例
  const instancel1 = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  });

  //使用实例进行请求
  instancel1({
    url: '/home/multidata'
  }).then(res =>{
    console.log(res);
  })

  instancel1({
    url: '/home/data'
  }).then(res =>{
    console.log(res);
  })

