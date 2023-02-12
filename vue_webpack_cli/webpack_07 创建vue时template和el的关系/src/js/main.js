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


//使用template模板 写html ,vue在编译时会复制到html中

const app = new Vue({
  el:'.app',
  template:`
  <div>
    <h1 :class="{active:!ist}">{{message}}</h1>
    <p>{{message}}</p>
    <button @click="butClick">按钮</button>
  </div>
  `,
  data:{
    message:'webpack',
    ist:true
  },
  methods:{
    butClick(){
      if (this.ist) {
        this.message = '......';
      }else{
        this.message = 'webpack';
      }
      this.ist = !this.ist;
    },
  }
})