<template>
  <div id="app">
    <!-- router-link属性
      tag 渲染的标签 (默认为a标签)
      replace 不能使用浏览器返回按钮 (不能返回页面)
      router-link-active 默认选中的class标签
    -->
    <router-link to="/home" tag="button" replace>首页</router-link>
    <router-link to="/about" tag="button" replace>关于</router-link>
    <!-- router-view 是视图的位置 -->
    <router-view></router-view>
  </div>
</template>

<style>
 /* .router-link-active{
   background: slategrey;
 } */
 .active{
   background: thistle;
 }
</style>
