<template>
  <div class="home">
    <h2>我是首页</h2>
    <router-link to="/home/news">新闻</router-link> |
    <router-link to="/home/messages">消息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {
    
  }
}
</script>

<style>
  li{
    list-style: none;
  }
</style>