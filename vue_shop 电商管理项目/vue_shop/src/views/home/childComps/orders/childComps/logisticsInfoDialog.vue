<template>
  <!-- 物流信息弹窗 -->
  <div class="logistics-info-dialog">
    <el-dialog
      title="物流信息"
      :visible.sync="dialogVisible"
      width="35%"
      @open="DialogOpen"
    >
    <!-- 时间线 -->
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in logisticsInfoList"
          :key="index"
          :timestamp="item.time"
          :color="item.color"
        >
          {{ item.context }}
        </el-timeline-item>
      </el-timeline>

    </el-dialog>
  </div>
</template>

<script>
import { getLogisticsInfo } from "@/network/orders";
export default {
  name: "logisticsInfoDialog",
  props: {
    order_id: Number,
  },
  data() {
    return {
      dialogVisible: false,
      logisticsInfoList: [
        {
          time: "2018-05-10 09:39:00",
          ftime: "2018-05-10 09:39:00",
          context: "已签收,感谢使用顺丰,期待再次为您服务",
          location: "",
          color: '#0bbd87'
        },
        {
          time: "2018-05-10 08:23:00",
          ftime: "2018-05-10 08:23:00",
          context:
            "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
          location: "",
          color: '#0bbd87'
        },
        {
          time: "2018-05-10 07:32:00",
          ftime: "2018-05-10 07:32:00",
          context: "快件到达 [北京海淀育新小区营业点]",
          location: "",
          color: '#0bbd87'
        },
        {
          time: "2018-05-10 02:03:00",
          ftime: "2018-05-10 02:03:00",
          context:
            "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
          location: "",
          color: '#0bbd87'
        },
        {
          time: "2018-05-09 23:05:00",
          ftime: "2018-05-09 23:05:00",
          context: "快件到达 [北京顺义集散中心]",
          location: "",
          color: '#0bbd87'
        },
        {
          time: "2018-05-09 21:21:00",
          ftime: "2018-05-09 21:21:00",
          context: "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
          location: "",
          color: '#0bbd87'
        },
        {
          time: "2018-05-09 13:07:00",
          ftime: "2018-05-09 13:07:00",
          context: "顺丰速运 已收取快件",
          location: "",
          color: '#0bbd87'
        },
        {
          time: "2018-05-09 12:25:03",
          ftime: "2018-05-09 12:25:03",
          context: "卖家发货",
          location: "",
          color: '#0bbd87'
        },
        {
          time: "2018-05-09 12:22:24",
          ftime: "2018-05-09 12:22:24",
          context: "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
          location: "",
          color: '#0bbd87'
        },
        {
          time: "2018-05-08 21:36:04",
          ftime: "2018-05-08 21:36:04",
          context: "商品已经下单",
          location: "",
          color: '#0bbd87'
        },
      ],
    };
  },
  methods: {
    // 弹窗打开
    async DialogOpen() {
      // const { data: res } = await getLogisticsInfo();
      console.log(this.logisticsInfoList);
    },
  },
};
</script>

<style scoped>
.el-dialog__wrapper /deep/.el-dialog{
  height: 550px;
  overflow: scroll;
}
</style>