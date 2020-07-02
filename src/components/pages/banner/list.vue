<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button class="addbtn" type="primary" @click="$router.push('/banner/info')">添加</el-button>
    <el-table
      :data="banners"
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
      <!-- <el-table-column prop="id" label="商品ID"></el-table-column> -->
      <el-table-column prop="title" label="轮播图名称"></el-table-column>
      <el-table-column label="轮播图片">
        <template slot-scope="item">
          <img :src="item.row.img" style="width:156px;height:60px" />
        </template>
      </el-table-column>
      <el-table-column label="状态" width="150">
        <template slot-scope="item">
          <el-button type="success" icon="el-icon-check" circle v-if="item.row.status == 1"></el-button>
          <el-button type="info" icon="el-icon-close" circle v-else></el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- 使用组件 -->
          <v-del :id="scope.row.id" url="/api/bannerdelete" txt="轮播图信息" @mdel="mdel"></v-del>
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
      banners: [],
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
    this.getlist();
  },
  methods: {
    //删除
    mdel(i) {
      console.log("用户被", i);
      this.getlist();
    },
    // 获取列表信息,{istree:1} 有树型结构
    getlist() {
      this.$http.get("/api/bannerlist").then(res => {
        if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "最新数据获取成功"
            });
            this.banners = res.data.list;
          } else {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.$notify({
                title: "失败",
                message: res.data.msg,
                type: "warning"
              });
              this.$router.push('/login');
            }, 1000);
          }
      });
    },
    edit(id) {
      // 方式二 拼接
      this.$router.push("/banner/" + id);
    }
  }
};
</script>

<style>
.addbtn {
  margin-bottom: 10px;
}
/* .el-table td,
.el-table th {
  text-align: center;
} */
</style>