import Vue from 'vue'
import App from './App'
// 引入自定义全局工具
import {toast,toImg} from './utils/common'
import {getLocal} from './utils/storage.js'
// 注册到Vue实例上
Vue.prototype.$show=toast
Vue.prototype.$img=toImg
Vue.prototype.getLocal=getLocal

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
