<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button class="addbtn" type="primary" @click="$router.push('/list/info')">添加</el-button>
    <!-- 
      stripe 条纹
      border 边框
      data 数据
    -->
    <el-table :data="menus" stripe border style="width: 100%">
      <!-- 
        prop 绑定数据
      -->
      <el-table-column prop="title" label="菜单名称" width="150"></el-table-column>
      <el-table-column prop="parentmenu" label="上级菜单"></el-table-column>
      <el-table-column prop="icon" label="菜单图标"></el-table-column>
      <el-table-column prop="address" label="菜单地址"></el-table-column>
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
      menus: [
        {
          title: "系统设置",
          icon: "icon-s-tools",
          address: "",
          parentmenu: "",
          status: true
        },
        {
          title: "菜单管理",
          icon: "icon-s-tools",
          address: "/list",
          parentmenu: "系统设置",
          status: true
        },
        {
          title: "用户管理",
          icon: "icon-s-tools",
          address: "/user",
          parentmenu: "系统设置",
          status: false
        }
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