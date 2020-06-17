<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button class="addbtn" type="primary" @click="$router.push('/role/info')">添加</el-button>
    <el-table
      :data="roles"
      stripe
      border
      style="width: 100%"
      v-loading.fullscreen.lock="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <el-table-column prop="id" label="角色编号"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="item">
          <el-button type="success" icon="el-icon-check" circle v-if="item.row.status == 1"></el-button>
          <el-button type="info" icon="el-icon-close" circle v-else></el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <!-- 使用公用组件 -->
          <v-del :id="scope.row.id" url="/api/roledelete" @mdel="mdel"></v-del>
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
      roles: [],
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
    //获取角色列表
    this.getRole();
  },
  methods: {
    // 子父组件通讯
    mdel(i){
      this.getRole();
      console.log('子父组件通讯操作',i);
    },
    //获取角色列表
    getRole() {
      this.$axios({
        url: "/api/rolelist"
        // params:{istree:1}
      }).then(res => {
        this.$message({
          type: "success",
          message: "最新数据获取成功"
        });
        this.roles = res.data.list;
        // console.log(this.roles)
      });
    },

    edit(id) {
      // console.log(this.$route)
      // 方式二 拼接
      this.$router.push("/role/" + id);
    },
   
  },
  watch: {
    $route(newVal, oldVal) {
      this.getRole();
    }
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