import * as math from "./math1";

// 依赖css
require('../css/c.css');


const c1 = [1,2,3];
let l1 = 'str';

console.log(math.add(1,1));
console.log(math.mul(2,2));
console.log(math.mul(2,2));
console.log(l1);

//引用vue
import Vue from 'vue';
import App from '../vue/App.vue'

//使用template模板 写html ,vue在编译时会复制到html中

const app = new Vue({
  el:'.app',
  template:'<App></App>',
  data:{

  },//使用组件关联 App.vue
  components:{
    App
  }
  
})