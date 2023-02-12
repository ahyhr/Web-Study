<template>
  <!-- 权限列表页面 -->
  <div class="rights">
    <!-- 面包屑 -->
    <breadcrumb :titles="['权限管理','权限列表']"/>

    <el-card class="box-card">
      <!-- 表格 -->
       <rights-table :rightsList="rightsList"/>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import RightsTable from './childComps/RightsTable.vue';
import { getRightsList } from "@/network/power.js";


export default {
  name: "Rights",
  data() {
    return {
      rightsList: [],
    };
  },
  created() {
    // 请求权限列表
    this.getRightsList();
  },
  methods: {
    //----------网络请求-----------
    async getRightsList() {
      const { data: res } = await getRightsList();
      if (res.meta.status !== 200) return this.$message.error("获取权限列表失败");
      // 请求成功
      this.rightsList = res.data;
    },
  },
  components: {
    Breadcrumb,
    RightsTable,
  },
};
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
  height: 100%;
  margin-top: 20px;
}
</style>