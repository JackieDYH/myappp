<template>
  <el-aside width="150px">
         <!-- 
            background-color  导航菜单背景颜色
            text-color        导航菜单文字颜色
            active-text-color 导航菜单选中后文字颜色
            unique-opened      只能有一个下拉展开
            default-active      当前激活菜单的 index
            √  第一种方式 设置  :default-active="this.$route.meta.select"
               第二种方式 设置   :default-active="defaultActive"   使用data中的
            router              是否使用 vue-router的模式
         -->
        <el-menu
          :default-active="this.$route.meta.select"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/list">菜单管理</el-menu-item>
              <el-menu-item index="/user">用户管理</el-menu-item>
              <el-menu-item index="1-3">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">商城管理1</el-menu-item>
              <el-menu-item index="3-2">商城管理2</el-menu-item>
              <el-menu-item index="3-3">商城管理3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
</template>

<script>
export default {
  data(){
    return{
      // 第二种设置 当前激活菜单的 index 路由
      // defaultActive:'',
    }
  },
    mounted(){
        //页面加载时，控住左侧菜单选中效果
        //把当前路由中的meta的自定义属性赋值给默认选中变量
        console.log(this.$route)
        // this.defaultActive = this.$route.meta.select;
    },
    watch:{
        // 监听route的地址变化 并改变数据
        $route(newVal,oldVal){
            console.log('当前访问地址',newVal.meta.select,'\n','旧地址',oldVal.meta.select);
            // 监听路由地址的改变
            // this.defaultActive = newVal.meta.select;
        }
    }
}
</script>

<style scoped>
.el-aside {
  background-color: #666;
  /* overflow-x: hidden; */
}
.el-submenu .el-menu-item{
    min-width: 150px;
}
</style>