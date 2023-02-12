<template>
  <div class="orders">
    <!-- 面包屑 -->
    <breadcrumb :titles="['订单管理', '订单列表']" />

    <el-card class="box-card">
      <!-- 搜索行 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            @keyup.enter.native="getOrderList"
            @clear="getOrderList"
            clearable
          >
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table class="table" :data="orderList" border stripe>
        <el-table-column
          align="center"
          type="index"
          label="#"
        ></el-table-column>
        <el-table-column
          min-width="200px"
          prop="order_number"
          label="订单编号"
        ></el-table-column>
        <el-table-column
          align="center"
          width="80px"
          prop="order_price"
          label="订单价格"
        ></el-table-column>
        <el-table-column align="center" width="100px" label="是否付款">
          <template v-slot="scope">
            <el-tag v-if="scope.row.pay_status == 0" type="warning">未付款</el-tag>
            <el-tag v-else type="success">已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="80px"
          prop="is_send"
          label="是否发货"
        ></el-table-column>
        <el-table-column align="center" width="180px" label="下单时间">
          <template v-slot="scope">
            {{ scope.row.create_time | addTimeFormat }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="scope">
            <!-- 按钮 -->
            <el-button-group>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="editOrder"
              ></el-button>
              <el-tooltip content="物流信息" placement="top" effect="light">
                <el-button
                  size="mini"
                  type="success"
                  icon="el-icon-location-outline"
                  @click="logisticsInof(scope.row.order_id)"
                ></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>

    <!-- 修改地址弹窗 -->
    <edit-order-dialog ref="editOrderDialogRef"/>
    <!-- 物流信息弹窗 -->
    <logistics-info-dialog ref="logisticsInfoDialogRef"/>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import editOrderDialog from './childComps/editOrderDialog'
import logisticsInfoDialog from './childComps/logisticsInfoDialog'
import { getOrderList } from "@/network/orders";
// 时间格式插件
import Moment from "moment";

export default {
  name: "Orders",
  components: { Breadcrumb, editOrderDialog, logisticsInfoDialog },
  data() {
    return {
      // 查询参数
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      // 总页数
      total: 0,
      // 订单列表
      orderList: [],
      order_id: null
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    // 物流信息按钮
    logisticsInof(order_id) {
      this.order_id = order_id;
      this.$refs.logisticsInfoDialogRef.dialogVisible = true;
    },
      //修改按钮
    editOrder() {
      this.$refs.editOrderDialogRef.dialogVisible = true;
    },
    // 页数变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrderList();
    },
    // 每页显示条数变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getOrderList();
    },

    //-------------网络请求-------------
    // 获取订单列表
    async getOrderList() {
      const { data: res } = await getOrderList(this.queryInfo);
      if (res.meta.status !== 200)
        return this.$message.error("获取订单列表失败");
      this.orderList = res.data.goods;
      this.total = res.data.total;
    },
  },
  filters: {
    // 格式化时间
    addTimeFormat(time) {
      return Moment.unix(time).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style scoped>
.box-card {
  margin-top: 20px;
}
.table {
  margin: 20px 0;
}
</style>