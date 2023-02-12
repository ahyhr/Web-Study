<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar>
      <tab-bar-item path="/home">
        <img slot="tab-img" src="@/assets/img/home.svg" alt="">
        <img slot="tab-active-img" src="@/assets/img/home_active.svg" alt="">
        <div slot="tab-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="tab-img" src="@/assets/img/category.svg" alt="">
        <img slot="tab-active-img" src="@/assets/img/category_active.svg" alt="">
        <div slot="tab-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/shopcart">
        <img slot="tab-img" src="@/assets/img/shopcart.svg" alt="">
        <img slot="tab-active-img" src="@/assets/img/shopcart_active.svg" alt="">
        <div slot="tab-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="tab-img" src="@/assets/img/profile.svg" alt="">
        <img slot="tab-active-img" src="@/assets/img/profile_active.svg" alt="">
        <div slot="tab-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from './components/tabbar/TabBar.vue'
import TabBarItem from './components/tabbar/TabBarItem.vue'

export default {
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>
  
</style>
