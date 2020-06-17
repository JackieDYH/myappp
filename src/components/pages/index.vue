<template>
  <el-container
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <el-header>
      <div class="head">
        <h3>小豪后台管理系统</h3>
        <div>
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span>{{ username }} 用户</span>
          <el-button type="danger" slot="reference" icon="el-icon-s-custom" round @click="quit">退出</el-button>
        </div>
      </div>
    </el-header>
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
import vNav from "../views/nav";
export default {
  data() {
    return {
      loading: true,
      username:'admin',
    };
  },
  components: {
    vNav
  },
  methods: {
    //退出登录
    quit() {
      this.$confirm("此操作将退出后台管理系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            sessionStorage.removeItem("userinfo");
            this.$router.push("/login");
          }, 1200);
          this.$message({
            type: "success",
            message: "退出登录成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录操作"
          });
        });
    }
  },
  mounted() {
    //设置用户名
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    this.username = userinfo.username;

    //加载效果
    setTimeout(() => {
      this.loading = false;
    }, 800);
    // console.log(this)
    // console.log(this.$router)
    // console.log(this.$route.path)
    // axios.get("/dyh/su?cb=&wd=北京").then(res=>{
    //   console.log(res,'dyh跨域请求测试')
    // })
  },
  //组件守卫 访问时
  beforeRouteEnter(to, from, next) {
    // console.log(to,from,next)
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    if (userinfo) {
      next();
    } else {
      next("/login"); //跳转登录
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
.el-header .head {
  display: flex;
  justify-content: space-between;
}
.el-header .head > div > span {
  vertical-align: middle;
}

.el-footer {
  text-align: center;
  line-height: 60px;
  color: rgb(223, 219, 219);
  background-color: #68717a;
}
</style>