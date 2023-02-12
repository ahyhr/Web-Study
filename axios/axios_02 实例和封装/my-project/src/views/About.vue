<template>
  <div class="about">
    <h4>{{message}}</h4>
  </div>
</template>

<script>
import { request } from "../network/request";
export default {
  data() {
    return {
      message: ''
    }
  },
  created() {
    request({
      url: '/home/data'
    }).then(res =>{
      this.message = res;
    })
  },
}
</script>