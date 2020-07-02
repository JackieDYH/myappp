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
          <span>{{ userInfo.username }} 用户</span>
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
// 引入计算
import { mapGetters,mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: true,
      // user: {
      //   username: ""
      // }
    };
  },
  components: {
    vNav
  },
  methods: {
    ...mapActions(['setAdeminUserSync']),
    // 1获取本地存储方法
    // getSession(data) {
    //   return JSON.parse(sessionStorage.getItem("data"));
    // },
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
            // sessionStorage.removeItem("userinfo");
            //2 vuex 退出登录 将值为空对象
            this.setAdeminUserSync({});

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
    //加载效果
    setTimeout(() => {
      this.loading = false;
    }, 800);
    // console.log(this)

    //1利用本地存储设置用户名
    // let userinfo = sessionStorage.getItem("userinfo")
    //   ? JSON.parse(sessionStorage.getItem("userinfo"))
    //   : { username: "未登录" };
    // this.user = userinfo;
  },
  computed:{//计算属性
    // 2 利用vuex设置
    ...mapGetters(['userInfo']),
  },

  //组件守卫 访问时 放到全局守卫里实现
  // beforeRouteEnter(to, from, next) {
  //   // console.log(to,from,next)
  //   let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
  //   if (userinfo) {
  //     //根据用户权限，对用户访问路由验证是否合法
  //     // 追加首页路由权限
  //     userinfo.menus_url.push("/");
  //     userinfo.menus_url.push("/home");
  //     // 允许访问路由地址
  //     let menuarr = userinfo.menus_url;
  //     let res = menuarr.find(item => {
  //       // 判断用户访问的路由在数组中是否存在
  //       return item == to.path;
  //     });
  //     if (res) {
  //       next();
  //     } else {
  //       alert("非法访问");
  //       next("/");
  //     }
  //   } else {
  //     next("/login"); //跳转登录
  //   }
  // },
  //   beforeRouteLeave(to, from, next){
  //   if (confirm("你确定要离开吗") == true) {
  //     next();
  //   } else {
  //     next(false);
  //   }
  // },
  // bug 添加页的路由需要处理 已经修复
  beforeRouteUpdate(to, from, next) {
    // let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    //2 vuex方式存储厂库
    let userinfo = this.userInfo;
    if (userinfo) {
      //根据用户权限，对用户访问路由验证是否合法
      // 追加首页路由权限
      userinfo.menus_url.push("/");
      userinfo.menus_url.push("/home");
      // userinfo.menus_url.push("/menu/info");
      // 允许访问路由地址
      let menuarr = userinfo.menus_url;
      //处理添加的路由规则 只匹配第一级路由即可
      let nowpatharr = to.path.split("/"); // 匹配父级路由即可
      let nowpath = "/" + nowpatharr[1];
      let res = menuarr.find(item => {
        // 判断用户访问的路由在数组中是否存在
        return item == nowpath;
      });
      if (res) {
        next();
      } else {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.$notify({
            title: "警告",
            message: "访问非法路由路径！！！",
            type: "warning"
          });
          next("/");
        }, 800);
      }
    } else {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$notify({
          title: "失败",
          message: "用户登录状态丢失！退出登录中",
          type: "warning"
        });
        next("/login"); //跳转登录
      }, 1000);
    }
  }
};
</script>

<style  scoped>
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

.el-main{
  height: 630px;
}

.el-footer {
  text-align: center;
  line-height: 60px;
  color: rgb(223, 219, 219);
  background-color: #68717a;
}
</style>