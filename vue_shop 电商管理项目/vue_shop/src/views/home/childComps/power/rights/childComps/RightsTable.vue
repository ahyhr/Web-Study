<template>
<!-- 表格 -->
  <div class="table" >
    <el-table :data="rightsList" border stripe>
      <el-table-column align="center" type="index" label="#"></el-table-column>
      <el-table-column align="center" prop="authName" label="权限名称"></el-table-column>
      <el-table-column align="center" prop="path" label="路径"></el-table-column>
      <el-table-column align="center" prop="level" label="权限等级">
        <template v-slot="scope">
          <el-tag size="mini" v-if="scope.row.level === '0'">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "RightsTable",
  props: {
    rightsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>

</style>