<template>
  <div class="hello">
    <h4>{{message}}</h4>
    <img src="" alt="">
  </div>
</template>

<script>
import { request } from "../network/request";

export default {
  name: 'HelloWorld',
  data() {
    return {
      message: '',
    }
  },
  created() {
    request({
      url: '/home/multidata'
    }).then(res => {
      console.log(res);
      this.message = res;
    }).catch(err => {
      console.log(err);
    })
  },
}
</script>

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
