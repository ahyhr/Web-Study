<template>
  <el-breadcrumb  separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="title in titles" :key="title">{{title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  }
};
</script>

<style>
</style>