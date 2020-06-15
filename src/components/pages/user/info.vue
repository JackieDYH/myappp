<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户添加</el-breadcrumb-item>
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
    >
      <el-form-item label="用户权限" prop="address">
        <el-select v-model="user.pid" placeholder="请选择">
          <el-option label="系统设置" value="系统设置"></el-option>
          <el-option label="用户设置" value="用户设置"></el-option>
        </el-select>
      </el-form-item>
      <!-- 
        prop 表单验证
      -->
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="初始密码" prop="pwd">
        <el-input v-model="user.pwd"></el-input>
      </el-form-item>
      <el-form-item label="用户头像">
        <el-input v-model="user.portrait"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="user.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        pwd: "",
        address: "",
        portrait: "",
        status: true
      },
      rules: {
        name: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 1, max: 8, message: "请输入1到8个汉字", trigger: "blur" }
        ],
        address: [{ required: true, message: "请选择用户权限", trigger: "change" }],
        pwd: [{ required: true, message: "请设置初始密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this);
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>