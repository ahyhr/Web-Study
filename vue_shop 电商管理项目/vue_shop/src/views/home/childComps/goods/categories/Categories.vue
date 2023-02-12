<template>
  <!-- 商品分类页面 -->
  <div class="categories">
    <!-- 面包屑 -->
    <breadcrumb :titles="['商品管理', '商品分类']" />
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 按钮 -->
      <el-button type="primary" @click="addCate">添加分类</el-button>
      <!-- 表格 -->
      <cate-Table :cateList="cateList" />

      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <!-- 添加分类按钮弹窗 -->
      <add-cate-dialog ref="addCateDialogRef"/>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import CateTable from "./childComps/CateTable";
import addCateDialog from "./childComps/addCateDialog";
import { getCateList } from "@/network/goods";

export default {
  name: "Categories",
  data() {
    return {
      // 商品分类列表
      cateList: [],
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      //总条数
      total: 0,
    };
  },
  components: { Breadcrumb, CateTable, addCateDialog },
  created() {
    // 获取商品列表
    this.getCateList();
  },
  methods: {
    // 添加分类按钮
    addCate() {
      this.$refs.addCateDialogRef.dialogVisible = true;
    },

    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getCateList();
    },
    // 监听 pagenum 改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getCateList();
    },
    // -----------网络请求------------
    async getCateList() {
      const { data: res } = await getCateList(
        this.queryInfo.type,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      );
      if (res.meta.status !== 200)
        return this.$message.error("获取商品分类失败");
      this.cateList = res.data.result;
      this.total = res.data.total;
    },
  },
};
</script>

<style scoped>
.box-card {
  margin-top: 20px;
}
</style>