<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 
      rules 表单验证规则
      model 表单使用的数据
    -->
    <el-form
      :model="role"
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
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model.trim="role.rolename"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree 
          :data="menus" 
          :props="defaultProps" 
          show-checkbox
          ref="tree"
          node-key='id'
          default-expand-all
          :default-checked-keys="defaultKeys"
        ></el-tree>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="role.status"></el-switch>
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
      role: {
        rolename:'',//名称
        menus:'',//权限
        status: true //状态
      },
      menus: [], //从数据库获取上级菜单列表
      defaultKeys:[],//选中数据
      defaultProps:{//二级数据
        children:'children',
        label:'title'
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 8, message: "请输入1到8个汉字", trigger: "blur" }
        ],
      }
    };
  },
  //生命周期函数挂载完后执行
  mounted() {
    // 查看路由 params 当有mid时 修改
    // console.log(this.$route);
    const mid = this.$route.params.mid;
    if (mid) {
      this.tip = "修改";
      // 获取路由传递过来的mid获取对应的菜单数据
      this.$axios({
        url: "/api/roleinfo",
        params: { id: mid }
      }).then(res => {
        console.log(res);
        this.role = res.data.list;
        // 匹配数据类型
        this.role.status = this.role.status == 1 ? true : false;
        this.defaultKeys = this.role.menus ? this.role.menus.split(',') : [];
      });
    }
    // 获取已有的菜单选项
    this.$axios({
      url:'/api/menulist',
      params:{istree:1}
    }).then(res=>{
      this.menus = res.data.list;
    })
  },
  methods: {
    submitForm(formName) {
      console.log(this);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证条件 满足添加
          //获取一下表单中的数据，用JSON序列化一下，防止数据变化后页面跟着变化
          let data = JSON.parse(JSON.stringify(this.role));
          //如果现在访问的是动态路由，则执行修改操作，否则执行添加操作
          let url = "/api/roleadd";
          const mid = this.$route.params.mid;
          if (mid) {
            url = "/api/roleedit";
            data.id = mid; //添加修改时提交的必要条件 菜单id
          }
          // 处理 status字段 将布尔值 转换 true 1 , false 2
          data.status = data.status ? 1 : 2;
          // console.log(this.$refs.tree.getCheckedKeys());//获取权限id
          //处理转换从字符串
          data.menus = this.$refs.tree.getCheckedKeys() ? this.$refs.tree.getCheckedKeys().join(',') : '';
          // console.log(data)
          // 处理目录菜单选项
          data.type == 1 ? data.url = '' : data.icon = '';

          //发起post请求，请求接口项目中的菜单添加接口，完成数据的保存
          this.$axios.post(url, data).then(res => {
            console.log(res);
            // 加载效果
            this.loading = true;
            if (res.data.code == 200) {
              this.$notify({
                title: "成功",
                message: `角色已经${this.tip}成功!`,
                type: "success"
              });
              setTimeout(() => {
                this.loading = false;
                this.$router.push("/role");
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
      this.$router.push("/role");
    }
  }
};
</script>

<style scoped>
</style>