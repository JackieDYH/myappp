<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button class="addbtn" type="primary" @click="$router.push('/goods/info')">添加</el-button>
    <!-- 树型
      row-key="id"
      :tree-props="{children:'children'}"
    -->
    <el-table
      :data="goods"
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
      <el-table-column prop="goodsname" label="商品名称" width="300"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="item">
          <img :src="item.row.img" style="width:60px;height:60px" />
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="150">
        <template slot-scope="item">
          <el-button type="warning" icon="el-icon-sell" circle v-if="item.row.isnew == 1"></el-button>
          <el-button type="info" icon="el-icon-sold-out" circle v-else></el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="150">
        <template slot-scope="item">
          <el-button type="primary" icon="el-icon-medal-1" circle v-if="item.row.ishot == 1"></el-button>
          <el-button type="info" icon="el-icon-medal" circle v-else></el-button>
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
          <v-del :id="scope.row.id" url="/api/goodsdelete" txt="商品信息" @mdel="mdel"></v-del>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pagesize"
      :total="total"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>

<script>
import vDel from "../../views/del";
export default {
  data() {
    return {
      goods: [],
      total: 0, //用户总条数
      pagesize: 4, //每页显示条数
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
    // this.getCate();
    // 分页
    this.getPage();
    this.getCount();
  },
  methods: {
    //删除
    mdel(i) {
      console.log("用户被", i);
      // this.getCate();
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
      //获取商品分类 用于计算分页 统计一级分类个数
      this.$http.get("/api/goodscount", { pid: 0 }).then(res => {
        this.total = res.data.list[0].total;
      });
    },
    getPage() {
      //获取用户数据 分页  page 当前页码  size每页显示几条
      this.$http
        .get("/api/goodslist", {
          page: this.nowpage,
          size: this.pagesize,
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "最新数据获取成功"
            });
            this.goods = res.data.list;
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
      this.$router.push("/goods/" + id);
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