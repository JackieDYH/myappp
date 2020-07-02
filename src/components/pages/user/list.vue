<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button class="addbtn" type="primary" @click="$router.push('/user/info')">添加</el-button>
    <el-table
      :data="users"
      stripe
      border
      style="width: 100%"
      v-loading.fullscreen.lock="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <el-table-column label="序号" width="80">
        <template slot-scope="item">{{item.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="uid" label="用户UID" width="380"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column label="状态" width="150">
        <template slot-scope="item">
          <el-button type="success" icon="el-icon-check" circle v-if="item.row.status == 1"></el-button>
          <el-button type="info" icon="el-icon-close" circle v-else></el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <v-del :id="scope.row.id" url="/api/userdelete" txt="用户信息" @mdel="mdel"></v-del>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 
    page-size 每页展示的数据条数
    total 总数据条数
    current-change 页码点击事件
    -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pagesize"
      :total="total"
      @current-change="pageChange"
    ></el-pagination>
  </div>
  <!-- 
    @current-change="(n)=>pageChange(n)"  相当于下面写法
    @current-change="pageChange" 直接这样写也行
    function(n){
      this.pageChange(n)
    }
  -->
</template>

<script>
import vDel from "../../views/del";
export default {
  data() {
    return {
      users: [],
      total: 0, //用户总条数
      pagesize: 6, //每页显示条数
      nowpage: 1, //当前页码值
      loading: true
    };
  },
  components: {
    vDel
  },
  mounted() {
    //加载效果
    setTimeout(() => {
      this.loading = false;
    }, 600);

    this.getPage();
    this.getCount();
  },
  methods: {
    //删除
    mdel(i) {
      console.log("用户被", i);
      this.setPage();
    },
    //删除时，获取最新页码
    setPage() {
      this.getCount(); //从新获取总数
      let page = Math.ceil((this.total - 1) / this.pagesize); //向上取整计算页数
      let nowpage = this.nowpage > page ? page : this.nowpage;
      this.nowpage = nowpage < 1 ? 1 : nowpage;
      this.getPage(); //获取数据
    },
    //分页
    pageChange(n) {
      this.nowpage = n;
      this.getPage();
    },
    getCount() {
      //获取用户总数 用于计算分页
      this.$http.get("/api/usercount").then(res => {
        this.total = res.data.list[0].total;
      });
    },
    getPage() {
      //获取用户数据 分页  page 当前页码  size每页显示几条
      this.$http
        .get("/api/userlist", { page: this.nowpage, size: this.pagesize })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "最新数据获取成功"
            });
            this.users = res.data.list;
          } else {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.$notify({
                title: "失败",
                message: res.data.msg,
                type: "warning"
              });
              this.$router.push("/login");
            }, 1000);
          }
        });
    },
    edit(id) {
      // console.log(id);
      // console.log(this.$route)
      // 携带对应菜单id 修改 方式一
      // this.$router.push({name:'userinfomid',params:{uid:id}});
      // 方式二 拼接
      this.$router.push("/user/" + id);
    }
    // del(id) {
    //   console.log(id);
    //   this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       //确定
    //       this.$axios({
    //         url: "/api/userdelete", //请求地址
    //         method: "post", //请求方式 默认get
    //         data: { id: id } //可以简写 data{id}
    //       }).then(res => {
    //         if (res.data.code === 200) {
    //           // 采用方式二 实现页面更新
    //           // this.$bus.$emit('upUser','delUser');

    //           this.setPage(), //获取最新页码 并 渲染的效果

    //           this.$message({
    //             type: "success",
    //             message: "删除成功!"
    //           });
    //         } else {
    //           //删除失败
    //           this.$message({
    //             type: "error",
    //             message: res.data.msg
    //           });
    //         }
    //       });
    //     })
    //     .catch(() => {
    //       //取消
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // }
  }
};
</script>

<style scoped>
.addbtn {
  margin-bottom: 10px;
}
.el-table td,
.el-table th {
  text-align: center;
}
</style>