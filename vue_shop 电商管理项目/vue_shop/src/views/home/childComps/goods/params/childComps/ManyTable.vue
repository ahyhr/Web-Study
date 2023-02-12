<template>
  <!-- 动态参数表格 -->
  <div class="many-table">
    <el-table :data="manyTableData" border stripe>
      <!-- 展开项 -->
      <el-table-column type="expand">
        <template v-slot="scope">
          <!-- 标签 -->
          <param-tag :currentItem="scope.row"/>
        </template>
      </el-table-column>

      <el-table-column align="center" type="index" label="#"></el-table-column>
      <el-table-column align="center" prop="attr_name" label="参数名称">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <!-- 按钮 -->
          <el-button-group>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editParams(scope.row.attr_id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteParams(scope.row.attr_id)"
              >删除</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ParamTag from './ParamTag'

export default {
  name: "ManyTable",
  props: {
    manyTableData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { ParamTag },
  methods: {
    editParams(attr_id) {
      this.$emit("editManyTableParams", attr_id);
    },
    deleteParams(attr_id) {
      this.$emit("deleteManyTableParams", attr_id);
    },
  },
};
</script>

<style scoped>
.many-table {
  margin-top: 20px;
}
</style>