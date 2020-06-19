<template>
  <el-button size="mini" type="danger" @click="del">删除</el-button>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["id", "url","txt"],
  methods: {
    del() {
      console.log(this.id);
      // this.$confirm("此操作将永久删除此内容, 是否继续?", "提示", {
      this.$confirm(`此操作将永久删除${this.txt ? this.txt : '此内容'}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //确定
          // this.$axios({
          //   url: this.url, //请求地址
          //   method: "post", //请求方式 默认get
          //   data: { id: this.id } //可以简写 data{id}
          // })
          this.$http.post(this.url, { id: this.id }).then(res => {
            if (res.data.code === 200) {
              //子父组件通讯
              this.$emit("mdel", `${this.txt}-delete`);
              // this.roles = res.data.list; //给页面中的数据重新赋值，实现数据变化，页面自动渲染的效果
              // 其他具体操作通过调用父级的事件实现
              
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              //删除失败
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          });
        })
        .catch(() => {
          //取消
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
</style>