<template>
  <div class="box">
    <div class="login">
      <h1>用户登录</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        v-loading.fullscreen.lock="loading"
        element-loading-text="登录中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="$router.push('/register')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkuser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [{ validator: checkuser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  // 钩子函数
  created() {
    // let that = this;
    document.onkeypress = e => {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        this.submitForm("ruleForm"); // 登录方法名
        return false;
      }
    };
  },
  mounted() {},
  methods: {
    setSession(data) {
      //本地临时存储
      sessionStorage.setItem("userinfo", JSON.stringify(data));
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: "/api/userlogin",
            method: "post",
            data: this.ruleForm
          }).then(res => {
            if (res.data.code == 200) {
              // 判断用户状态是否被禁用 1 启用 2 禁用
              if (res.data.list.status == 1) {
                this.loading = true;
                setTimeout(() => {
                  this.loading = false;
                  this.$notify({
                    title: "成功",
                    message: "登录成功",
                    type: "success"
                  });
                  // console.log(res.data)
                  this.setSession(res.data.list);
                  this.$router.push("/");
                }, 900);
              } else {
                console.log(res);
                this.loading = true;
                setTimeout(() => {
                  this.loading = false;
                  this.$notify({
                    title: "失败",
                    message: `当前${this.ruleForm.username}用户已被禁用，请联系管理员`,
                    type: "warning"
                  });
                }, 800);
              }
            } else {
              this.loading = true;
              setTimeout(() => {
                this.loading = false;
                this.$notify({
                  title: "失败",
                  message: res.data.msg,
                  type: "warning"
                });
              }, 800);
            }
          });
        } else {
          this.$notify({
            title: "警告",
            message: "请输入用户名密码",
            type: "warning"
          });
          return false;
        }
      });
    }
  }
  //登录
};
</script>

<style scoped>
.box {
  background-color: rgba(87, 112, 133, 0.205);
  background: -webkit-linear-gradient(left, #88ada6, #d6ecf0);
}
h1 {
  text-align: center;
  padding: 20px 0px;
}
.login {
  width: 420px;
  margin: 0 auto;
  padding: 10px;
  transform: translateY(50%);
  background-color: #fff;
  border-radius: 16px;
}
</style>