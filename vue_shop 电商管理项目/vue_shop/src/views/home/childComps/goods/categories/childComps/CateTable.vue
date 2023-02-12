<template>
  <div class="cate-table">
    <el-table
      :data="cateList"
      row-key="cat_id"
      border
      :tree-props="{ children: 'children', hasChildren: 'Children' }"
    >
      <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
      <el-table-column label="是否有效" align="center">
        <template v-slot="scope">
          <i
            class="el-icon-circle-check"
            style="color: lightgreen"
            v-if="!scope.row.cat_deleted"
          ></i>
          <i class="el-icon-circle-close" style="color: red" v-else></i>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template v-slot="scope">
          <el-tag size="mini" v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag
            size="mini"
            type="success"
            v-else-if="scope.row.cat_level == 1"
            >二级</el-tag
          >
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button-group>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editCate(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteCate(scope.row)"
              >删除</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑按钮弹窗 -->
    <edit-cate-dialog ref="editCateFromRef" :currentCate="currentCate" />
  </div>
</template>

<script>
import editCateDialog from "./editCateDialog.vue";
import { deleteCate } from "@/network/goods";

export default {
  name: "CateTable",
  props: {
    cateList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentCate: {},
    };
  },
  components: {
    editCateDialog,
  },
  methods: {
    // 编辑菜单按钮
    editCate(cate) {
      console.log(cate);
      this.currentCate = cate;
      this.$refs.editCateFromRef.dialogVisible = true;
    },
    // 删除按钮
    deleteCate(cate) {
      // 确认提示框
      this.$confirm("是否删除该分类?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送删除请求
          this.deleteCateRequest(cate);
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    },
    async deleteCateRequest(cate) {
      const { data: res } = await deleteCate(cate.cat_id);
      if (res.meta.status !== 200) return this.$message.error("删除失败");
      this.$parent.$parent.getCateList();
      console.log(cate);
    },
  },
};
</script>

<style scoped>
.cate-table {
  margin-top: 20px;
}
</style>