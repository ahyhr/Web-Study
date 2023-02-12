<template>
  <!-- 商品列表 -->
  <div class="list">
    <!-- 面包屑 -->
    <breadcrumb :titles="['商品管理', '商品列表']" />

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 搜索按钮行 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            v-model="queryInfo.query"
            @keyup.enter.native="getGoodsList"
            @clear="getGoodsList"
            placeholder="请输入内容"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <goods-list-table :goodsList="goodsList" />

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
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import goodsListTable from "./childComps/goodsListTable";
import { getGoodsList } from "@/network/goods";

export default {
  name: "List",
  data() {
    return {
      // 请求数据
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      // 商品列表数据
      goodsList: [],
      // 总条数
      total: 0,
    };
  },
  components: { Breadcrumb, goodsListTable },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 添加商品按钮
    addGoods() {
      this.$router.push('/goods/addGoods');
    },
    // 监听 页数 改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },
    // 监听 每页显示条数 改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    // --------网络请求--------
    // 获取商品列表
    async getGoodsList() {
      const { data: res } = await getGoodsList(this.queryInfo);
      if (res.meta.status !== 200)
        return this.$message.error("获取商品列表失败");
      this.goodsList = res.data.goods;
      this.total = res.data.total;
    },
  }
};
</script>

<style scoped>
.box-card {
  margin-top: 20px;
}
</style>