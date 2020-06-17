<template>
  <router-view id="app"></router-view>
</template>
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
</style>
<script>
export default {
  name: 'App',
  components:{
  }
}
</script>
