<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
    class="echa"
  >
    <div id="main" style="width: 700px;height:450px;"></div>
    <div id="admin" style="width: 450px;height:450px;"></div>
  </div>
</template>

<script>
// 引入数据可视化
import echarts from "echarts";
export default {
  data() {
    return {
      loading: true,
      orderTitle: [],
      orderData: [],
      usergroup: [],
      charts: ""
    };
  },
  mounted() {
    //加载效果
    setTimeout(() => {
      this.loading = false;
    }, 800);

    this.$http.get(this.$api.goodsgroupcount).then(res => {
      console.log(res, 111);
      if (res.data.code == 200) {
        res.data.list.map(item => {
          this.orderTitle.push(item.catename);
          this.orderData.push(item.count);
        });
        this.setcharst(this.orderTitle, this.orderData);
      } else {
        setTimeout(() => {
          this.loading = false;
          this.$notify({
            title: "失败",
            message: res.data.msg,
            type: "error"
          });
          this.$router.push("/");
        }, 1000);
      }
    });
    this.$http.get(this.$api.usergroupcount).then(res => {
      if (res.data.code == 200) {
        res.data.list.map(item => {
          if (item.roleid == 1) {
            this.usergroup.push({ value: item.count, name: "管理员" });
          } else {
            this.usergroup.push({ value: item.count, name: "客服" });
          }
          this.pancake(this.usergroup);
        });
      } else {
        setTimeout(() => {
          this.loading = false;
          this.$notify({
            title: "失败",
            message: res.data.msg,
            type: "error"
          });
          this.$router.push("/");
        }, 1000);
      }
    });
  },
  methods: {
    pancake(data) {
      this.cake = echarts.init(document.getElementById("admin"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["管理员", "客服"]
        },
        series: [
          {
            name: "注册管理量",
            type: "pie",
            radius: ["30%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data
          }
        ]
      };
      this.cake.setOption(option);
    },
    setcharst(title, data) {
      // 基于准备好的dom，初始化echarts实例
      this.charts = echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "商品数量"
        },
        tooltip: {},
        legend: {
          data: ["数量"]
        },
        xAxis: {
          type: "category",
          data: title
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "line",
            data
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.charts.setOption(option);
    }
  }
};
</script>

<style scoped>
.echa {
  display: flex;
}
</style>