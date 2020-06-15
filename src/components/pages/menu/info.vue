<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list' }">菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单添加</el-breadcrumb-item>
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
    >
      <el-form-item label="上级菜单" prop="parentmenu">
        <el-select v-model="menus.parentmenu" placeholder="请选择">
          <el-option label="系统设置" value="系统设置"></el-option>
          <el-option label="用户设置" value="用户设置"></el-option>
        </el-select>
      </el-form-item>
      <!-- 
        prop 表单验证
      -->
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="menus.title"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" prop="address">
        <el-input v-model="menus.address"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="menus.icon"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="menus.status"></el-switch>
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
      menus: {
        title: "系统设置",
        icon: "icon-s-tools",
        address: "/user",
        parentmenu: "系统设置",
        status: true
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 1, max: 8, message: "请输入1到8个汉字", trigger: "blur" }
        ],
        parentmenu: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
        address: [{ required: true, message: "请输入菜单地址", trigger: "blur" }]
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