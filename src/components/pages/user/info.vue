<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 
      rules 表单验证规则
      model 表单使用的数据
    -->
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
      <el-form-item label="所属角色" prop="roleid">
        <el-select v-model="user.roleid" placeholder="请选择">
          <el-option v-for="item of roles" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="user.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="user.password" autocomplete="off"></el-input>
        <span v-if="tip == '修改'" style="color:#9e9e9e">留空！不修改密码</span>
      </el-form-item>
      <!-- <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
        </el-form-item> -->
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
        uid: "", //uid
        roleid:'',//角色id
        username: "", //用户名
        password: "", //密码
        status: true //状态
      },
      // users: [],
      roles:[],//角色列表
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 16, message: "请输入1到16个汉字", trigger: "blur" }
        ],
        roleid: [{ required: true, message: "请选择所属角色", trigger: "change" }]
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
      this.$http.get("/api/userinfo", { uid: uid }).then(res => {
        // console.log(res);
        this.user = res.data.list;
        // 匹配数据类型
        this.user.password = '';//为空不修改密码
        this.user.status = this.user.status == 1 ? true : false;
      });
    }
    //获取角色列表
    this.$http.get("/api/rolelist", { istree: 1 }).then(res => {
      this.roles = res.data.list; //动态设置上级菜单下拉列表
    });
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
          let url = "/api/useradd";
          const uid = this.$route.params.uid;
          if (uid) {
            url = "/api/useredit";
            data.id = uid; //添加修改时提交的必要条件 菜单id
          }
          // 处理 status字段 将布尔值 转换 true 1 , false 2
          data.status = data.status ? 1 : 2;
          // console.log(data);return;

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
                message: `管理员已经${this.tip}成功!`,
                type: "success"
              });
              setTimeout(() => {
                this.loading = false;
                this.$router.push("/user");
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
      this.$router.push("/user");
      // this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>