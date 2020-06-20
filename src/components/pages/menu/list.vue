<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button class="addbtn" type="primary" @click="$router.push('/menu/info')">添加</el-button>
    <!-- 
      stripe 条纹
      border 边框
      data 数据
      row-key 树型结构
      tree-props 绑定数据
      v-loading.fullscreen.lock 加载中效果
    -->
    <el-table
      :data="menus"
      stripe
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{children:'children'}"
      v-loading.fullscreen.lock="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <!-- 
        prop 绑定数据
      -->
      <el-table-column prop label="层级" width="50"></el-table-column>
      <el-table-column prop="id" label="菜单ID" width="100">
        <!-- <template slot-scope="item">{{item.$index}}</template> -->
      </el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <!-- <el-table-column prop="pid" label="上级菜单"></el-table-column> -->
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="item">
          <i :class="item.row.icon"></i>
          / {{ item.row.icon }}
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态" width="150">
        <template slot-scope="item">
          <el-button type="success" icon="el-icon-check" circle v-if="item.row.status == 1"></el-button>
          <el-button type="info" icon="el-icon-close" circle v-else></el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <v-del :id="scope.row.id" url="/api/menudelete" txt="菜单信息" @mdel="mdel"></v-del>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import vDel from "../../views/del";
export default {
  data() {
    return {
      menus: [],
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

    // this.$axios.get('/api/menulist').then(res=>{
    //   // console.log(res)
    //   this.menus = res.data.list;
    // })
    this.getMenu();
  },
  methods: {
    // 子父组件通讯
    mdel(i) {
      this.getMenu();
      // 非父子组件监听
      this.$bus.$emit("upMenu", "delMenu");
      console.log("子父组件通讯操作", i);
    },
    //添加istree 返回树形结构的数据 获取菜单列表
    getMenu() {
      // this.$axios({
      //   url: "/api/menulist",
      //   params: { istree: 1 }
      // })
      this.$http.get("/api/menulist", { istree: 1 }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "最新数据获取成功"
          });
          this.menus = res.data.list;
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
      // this.$router.push({name:'menuinfomid',params:{uid:id}});
      // 方式二 拼接
      this.$router.push("/menu/" + id);
    }

    //废弃 改用共用组件  子父组件通讯实现
    // del(id) {
    //   console.log(id);
    //   this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       //确定
    //       // this.$axios({
    //       //   url: "/api/menudelete", //请求地址
    //       //   method: "post", //请求方式 默认get
    //       //   data: { id: id } //可以简写 data{id}
    //       // })
    //       this.$http.post("/api/menudelete", { id: id }).then(res => {
    //         if (res.data.code === 200) {
    //           // 采用方式一 实现页面更新
    //           // this.$bus.$emit('upMenu','delMenu');
    //           this.menus = res.data.list; //给页面中的数据重新赋值，实现数据变化，页面自动渲染的效果
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

<style>
.addbtn {
  margin-bottom: 10px;
}
.el-table td,
.el-table th {
  text-align: center;
}
</style>