<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button class="addbtn" type="primary" @click="$router.push('/user/info')">添加</el-button>
    <el-table :data="users" stripe border style="width: 100%">
      <el-table-column prop="name" label="用户名称" width="150"></el-table-column>
      <el-table-column prop="pwd" label="用户密码"></el-table-column>
      <el-table-column prop="portrait" label="用户头像"></el-table-column>
      <el-table-column prop="address" label="用户权限"></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="item">
          <el-switch v-model="item.row.status"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          name: "admin",
          pwd: "admin",
          address: "高级管理员",
          portrait: "icon-s-tools",
          status: true
        },
        {
          name: "admin",
          pwd: "admin",
          address: "管理员",
          portrait: "icon-s-tools",
          status: true
        },
        {
          name: "user",
          pwd: "user123",
          address: "管理员",
          portrait: "icon-s-tools",
          status: false
        },
      ]
    };
  },
  methods: {
    handleEdit(id, row) {
      console.log(id, row);
    },
    handleDelete(id, row) {
      console.log(id, row);
    }
  },
  
};
</script>

<style scoped>
.addbtn {
  margin-bottom: 10px;
}
</style>