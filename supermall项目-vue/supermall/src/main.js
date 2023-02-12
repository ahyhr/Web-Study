import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'

// vant 轮播图插件
import { Swipe, SwipeItem } from "vant";
import "vant/lib/swipe/style";
Vue.use(Swipe);
Vue.use(SwipeItem);

//toast 弹窗插件
import toast from '@/components/common/toast'
Vue.use(toast);

Vue.config.productionTip = false

//事件总线
Vue.prototype.$bus = new Vue()

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad, {
  //加载中背景图
  loading: require('./assets/img/common/placeholder.jpg')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
