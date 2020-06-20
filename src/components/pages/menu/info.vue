<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 
      rules 表单验证规则
      model 表单使用的数据
    -->
    <el-form
      :model="menus"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width:600px"
      v-loading.fullscreen.lock="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="menus.pid" placeholder="请选择">
          <el-option label="顶层菜单" :value="0"></el-option>
          <el-option v-for="item of pidmenu" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 
        prop 表单验证
      -->
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model.trim="menus.title"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio v-model="menus.type" :label="1">目录</el-radio>
        <el-radio v-model="menus.type" :label="2">菜单</el-radio>
      </el-form-item>
      <el-form-item label="icon图标" v-show="menus.type == 1">
        <el-input v-model.trim="menus.icon"></el-input>
      </el-form-item>
      <el-form-item label="路由地址" v-show="menus.type == 2">
        <el-input v-model.trim="menus.url"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="menus.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ tip }}</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tip: "添加",
      loading: false,
      menus: {
        pid: "", //上级菜单
        title: "", //菜单标题
        icon: "", //图标
        url: "", //地址
        type: 1, //目录类型
        status: true //状态
      },
      pidmenu: [], //从数据库获取上级菜单列表
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 1, max: 16, message: "请输入1到16个汉字", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }]
      }
    };
  },
  //生命周期函数挂载完后执行
  mounted() {
    // 查看路由 params 当有mid时 修改
    console.log(this.$route);
    const mid = this.$route.params.mid;
    if (mid) {
      this.tip = "修改";
      // 获取路由传递过来的mid获取对应的菜单数据
      // this.$axios({
      //   url: "/api/menuinfo",
      //   params: { id: mid }
      // })
      this.$http.get("/api/menuinfo",{ id: mid }).then(res => {
        console.log(res);
        this.menus = res.data.list;
        // 匹配数据类型
        this.menus.status = this.menus.status == 1 ? true : false;
      });
    }
    //获取一级菜单
    // this.$axios({
    //   url: "/api/menulist", //菜单列表
    //   params: { istree: 1 }
    // })
    this.$http.get("/api/menulist", { istree: 1 }).then(res => {
      this.pidmenu = res.data.list; //动态设置上级菜单下拉列表
      console.log(this.pidmenu,2222)
    });
  },
  methods: {
    submitForm(formName) {
      console.log(this);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证条件 满足添加
          //获取一下表单中的数据，用JSON序列化一下，防止数据变化后页面跟着变化
          let data = JSON.parse(JSON.stringify(this.menus));
          //如果现在访问的是动态路由，则执行修改操作，否则执行添加操作
          let url = "/api/menuadd";
          const mid = this.$route.params.mid;
          if (mid) {
            url = "/api/menuedit";
            data.id = mid; //添加修改时提交的必要条件 菜单id
          }
          // 处理 status字段 将布尔值 转换 true 1 , false 2
          data.status = data.status ? 1 : 2;
          // 处理目录菜单选项
          data.type == 1 ? data.url = '' : data.icon = '';
          

          //发起post请求，请求接口项目中的菜单添加接口，完成数据的保存
          this.$http.post(url, data).then(res => {
            console.log(res);
            // 加载效果
            this.loading = true;
            if (res.data.code == 200) {
            // 采用方式二 实现页面更新
            // this.$bus.$emit('upMenu','updateMenu');
              this.$notify({
                title: "成功",
                message: `菜单已经${this.tip}成功!`,
                type: "success"
              });
              setTimeout(() => {
                this.loading = false;
                this.$router.push("/menu");
                // this.$forceUpdate();
              }, 600);
            } else {
              setTimeout(() => {
                this.loading = false;
                this.$notify({
                  title: "失败",
                  message: res.data.msg,
                  type: "error"
                });
              }, 1000);
            }
          });
        }
      });
    },
    //取消
    resetForm(formName) {
      this.$router.push("/menu");
      // this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>