<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <h1>后台管理中</h1>
    <p>代应豪</p>
    <p>elementUI+vue+路由守卫</p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loading:true,
    }
  },
  mounted(){
    //加载效果
    setTimeout(() => {
      this.loading = false;
    }, 800);
  }
}
</script>

<style>

</style>