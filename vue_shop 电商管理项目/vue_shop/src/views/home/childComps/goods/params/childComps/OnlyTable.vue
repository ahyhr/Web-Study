<template>
  <div class="only-table">
    <el-table :data="onlyTableData" border stripe>
      <!-- 展开项 -->
      <el-table-column type="expand">
        <template v-slot="scope">
          <!-- 标签 -->
          <param-tag :currentItem="scope.row"/>
        </template>
      </el-table-column>

      <el-table-column align="center" type="index" label="#"></el-table-column>
      <el-table-column align="center" prop="attr_name" label="属性名称">
      </el-table-column>
      
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
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
  name: "OnlyTable",
  props: {
    onlyTableData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { ParamTag },
  methods: {
    editParams(attr_id) {
      this.$emit("editonlyTableParams", attr_id);
    },
    deleteParams(attr_id) {
      this.$emit("deleteonlyTableParams", attr_id);
    }
  },
};
</script>

<style scoped>
.only-table {
  margin-top: 20px;
}
</style>