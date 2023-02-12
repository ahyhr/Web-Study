<template>
  <!-- 数据统计页面 -->
  <div class="reports">
    <!-- 面包屑 -->
    <breadcrumb :titles="['数据统计', '数据报表']" />

    <el-card class="box-card">
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width: 100%; height: 550px"></div>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { getEchartData } from "@/network/reports";
// 引入echarts
// 引入基本模板
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/grid')
require('echarts/lib/component/legend')


export default {
  name: "Reports",
  components: { Breadcrumb },
  data() {
    return {
      option: {
        legend: {},
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          showContent: false,
        },
        dataset: {
          source: [
            [
              "product",
              "2017-12-27",
              "2017-12-28",
              "2017-12-29",
              "2017-12-30",
              "2017-12-31",
              "2018-1-1",
            ],
            ["华东", 2999, 3111, 4100, 3565, 3528, 6000],
            ["华南", 5090, 2500, 3400, 6000, 6400, 7800],
            ["华北", 6888, 4000, 8010, 12321, 13928, 12984],
            ["西部", 9991, 4130, 7777, 12903, 13098, 14028],
            ["其他", 15212, 5800, 10241, 14821, 15982, 14091],
          ],
        },
        xAxis: { type: "category" },
        yAxis: { gridIndex: 0 },
        grid: { top: "55%" },
        series: [
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "pie",
            id: "pie",
            radius: "30%",
            center: ["50%", "25%"],
            emphasis: { focus: "data" },
            label: {
              formatter: "{b}: {@2012} ({d}%)",
            },
            encode: {
              itemName: "product",
              value: "2012",
              tooltip: "2012",
            },
          },
        ],
      },
    };
  },
  async mounted() {
    // const { data: res } = await getEchartData();
    // if (res.meta.status !== 200) return this.$message.error("获取图标数据失败");
    // console.log(res);

    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById("main"));
    myChart.on("updateAxisPointer", function (event) {
      var xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        var dimension = xAxisInfo.value + 1;
        myChart.setOption({
          series: {
            id: "pie",
            label: {
              formatter: "{b}: {@[" + dimension + "]} ({d}%)",
            },
            encode: {
              value: dimension,
              tooltip: dimension,
            },
          },
        });
      }
    });
    myChart.setOption(this.option);
  },
};
</script>

<style scoped>
.box-card {
  margin-top: 20px;
}
</style>