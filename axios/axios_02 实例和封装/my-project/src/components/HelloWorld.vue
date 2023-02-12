<template>
  <div class="hello">
    <h4>{{message}}</h4>
  </div>
</template>

<script>
//引入 封装的axios
import {request} from '../network/request.js'

export default {
  name: 'HelloWorld',
  data() {
    return {
      message: ''
    }
  },
  created() {
    //使用axios
    request({
      url: '/home/multidata'
    }).then(res =>{
      console.log(res);
      this.message = res;
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
