import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'

Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
