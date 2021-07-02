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
  data() {
    return {
      path:'/home/news'
    }
  },
  created() {
    console.log('home创建');
  },
  destroyed() {
    console.log('home销毁');
  },
  //home 组件激活时(使用keep-alive时)
  activated() {
    console.log('aaaaaaa');
    //跳转path路径  (默认路径)
    this.$router.push(this.path);
  },
  //路由跳转时
  beforeRouteLeave (to, from, next) {
    //将当前路径 赋值path
    console.log(this.$route.path);
    this.path = this.$route.path;
    next();
  }
}
</script>

<style>
  li{
    list-style: none;
  }
</style>