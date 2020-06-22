<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
// 引入数据可视化
import echarts from "echarts";
export default {
  data() {
    return {
      loading: true,
      orderData:[5, 20, 16, 20, 8, 30],
      charts: "",
    };
  },
  mounted() {
    //加载效果
    setTimeout(() => {
      this.loading = false;
    }, 800);
    this.setcharst();
  },
  methods: {
    setcharst() {
      // 基于准备好的dom，初始化echarts实例
      this.charts = echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "商城销量"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          type:'category',
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "line",
            data: this.orderData
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.charts.setOption(option);
    }
  }
};
</script>

<style>
</style>