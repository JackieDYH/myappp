<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/member' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="user"
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
      <el-form-item label="用户名" prop="nickname">
        <el-input v-model.trim="user.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="user.password" autocomplete="off"></el-input>
        <span v-if="tip == '修改'" style="color:#9e9e9e">留空！不修改密码</span>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input type="tel" v-model.trim="user.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="user.status"></el-switch>
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
      user: {
        nickname: "", //用户名
        password: "", //密码
        phone: "", //手机号
        status: true //状态
      },
      rules: {
        nickname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 16, message: "请输入1到16个汉字", trigger: "blur" }
        ],
        // password: [
        //   { required: true, message: "请输入密码", trigger: "change" }
        // ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min:11,max:11,message:"请输入正确的手机号",trigger:"blur" }
        ]
      }
    };
  },
  //生命周期函数挂载完后执行
  mounted() {
    // 查看路由 params 当有uid时 修改
    console.log(this.$route);
    const uid = this.$route.params.uid;
    if (uid) {
      this.tip = "修改";
      // 获取路由传递过来的uid获取对应的菜单数据
      this.$http.get("/api/memberinfo", { uid: uid }).then(res => {
        this.user = res.data.list;
        console.log(this.user,111111111111)
        // 匹配数据类型
        this.user.password = ""; //为空不修改密码
        this.user.status = this.user.status == 1 ? true : false;
        console.log(this.user,2222222222);
      });
    }
  },
  methods: {
    submitForm(formName) {
      // console.log(this);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证条件 满足添加
          //获取一下表单中的数据，用JSON序列化一下，防止数据变化后页面跟着变化
          let data = JSON.parse(JSON.stringify(this.user));
          //如果现在访问的是动态路由，则执行修改操作，否则执行添加操作
          let url = "/api/register";
          const uid = this.$route.params.uid;
          if (uid) {
            url = "/api/memberedit";
            data.id = uid; //添加修改时提交的必要条件 菜单id
          }
          // 处理 status字段 将布尔值 转换 true 1 , false 2
          data.status = data.status ? 1 : 2;
          // console.log(data);return;
          //发起post请求，请求接口项目中的菜单添加接口，完成数据的保存
          this.$http.post(url, data).then(res => {
            // 加载效果
            this.loading = true;
            if (res.data.code == 200) {
              this.$notify({
                title: "成功",
                message: `用户已经${this.tip}成功!`,
                type: "success"
              });
              setTimeout(() => {
                this.loading = false;
                this.$router.push("/member");
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
      this.$router.push("/member");
    }
  }
};
</script>

<style scoped>
</style>