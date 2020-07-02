<template>
  <router-view id="app"></router-view>
</template>
<script>
export default {
  name: 'App',
  components:{
    }
}
</script>
<style>
#app{
  width: 100%;
  height: 100%;
  /* display: flex;
  flex-direction: column; */
}
.el-breadcrumb{
  padding: 0 0 20px;
}
/* 分页组件 */
.el-pagination{
  float: right;
  margin-top: 6px;
}
/* 表格居中 */
.el-table td,
.el-table th {
  text-align: center;
}
</style>
