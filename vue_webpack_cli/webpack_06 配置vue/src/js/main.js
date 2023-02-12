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

const app = new Vue({
  el:'.app',
  data:{
    message:'webpack'
  },
  components:{
    cpn:{
      template:`
      <h1>{{cmessage}}</h1>`,
      props:{
        cmessage:String
      }
    }
  }
})