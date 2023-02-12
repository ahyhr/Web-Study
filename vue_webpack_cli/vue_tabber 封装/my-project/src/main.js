import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

window.onresize = getRem;
		    function getRem(){
				
		        document.documentElement.style.fontSize = document.documentElement.offsetWidth / 7.5 +'px';
				
		    }
		    getRem();