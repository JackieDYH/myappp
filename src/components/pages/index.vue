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
    <el-footer>版权所有 &copy; DYH 2020</el-footer>
  </el-container>
</template>

<script>
import vNav from '../views/nav'
export default {
    components:{
      vNav
    },
    mounted(){
      // console.log(this)
        // console.log(this.$router)
        // console.log(this.$route.path)
        // axios.get("/dyh/su?cb=&wd=北京").then(res=>{
        //   console.log(res,'dyh跨域请求测试')
        // })
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
  background-color: #5a69ca;
}
.el-footer {
  text-align: center;
  line-height: 60px;
  color: rgb(223, 219, 219);
  background-color: #68717a;
}
</style>