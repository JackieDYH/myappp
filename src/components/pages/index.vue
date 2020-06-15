<template>
  <el-container>
    <el-header>小豪后台管理系统</el-header>
    <el-container>
      <v-nav></v-nav>
      <el-main>
        <!-- 右侧路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>版权所有DYH</el-footer>
  </el-container>
</template>

<script>
import vNav from '../views/nav'
export default {
    components:{
      vNav
    },
    mounted(){
        // console.log(this.$router)
        // console.log(this.$route.path)
    },
    //组件守卫
    beforeRouteEnter(to,from,next){
        // console.log(to,from,next)
        let userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
        if(userinfo){
            next();
        }else{
            next('/login');//跳转登录
        }
    }
};
</script>

<style>
.el-header {
  line-height: 2;
  font-size: 24px;
  color: #fff;
  background-color: #9e9e9e;
}
.el-footer {
  text-align: center;
  line-height: 60px;
  background-color: #999;
}
</style>