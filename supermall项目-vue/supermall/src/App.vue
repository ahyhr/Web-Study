<template>
  <div id="app">
    <keep-alive exclude="Detail"><!-- 离开时不自动销毁  --> 
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabBar/MainTabBar.vue";

export default {
  components: { MainTabBar },
};
</script>

<style>
@import url("assets/css/base.css");
</style>
