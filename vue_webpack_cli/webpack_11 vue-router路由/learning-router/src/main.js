import Vue from 'vue'
import App from './App.vue'
//导入router (导入目录会自动寻找 index文件)
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
