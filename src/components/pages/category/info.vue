<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/category' }">商品分类</el-breadcrumb-item>
      <el-breadcrumb-item>商品{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="info"
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
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="info.pid" placeholder="请选择">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option v-for="item of cates" :key="item.id" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input v-model.trim="info.catename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="img">
        <!-- 
          上传图片
          action 上传服务器地址
          list-type 文件列表类型
          on-preview 图片预览执行函数
          on-remove 图片删除时执行
          auto-upload 是否自动上传
          on-change 文件选后或上传完成后或失败后 执行函数
        -->
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="fileChange"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="info.status"></el-switch>
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
      dialogVisible: false,
      dialogImageUrl: "",
      fileList:[],//展示图片 修改时
      tip: "添加",
      loading: false,
      info: {
        pid: "", //pid
        catename: "", //分类名
        status: true //状态
      },
      img: "", //图片
      cates: [], //分类列表
      rules: {
        catename: [
          { required: true, message: "分类名称不能为空！", trigger: "blur" },
          { min: 1, max: 16, message: "请输入1到16个汉字", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "blur" }],
        // img: [{ required: true, message: "请上传商品图片", trigger: "blur" }]
      }
    };
  },
  //生命周期函数挂载完后执行
  mounted() {
    // 查看路由 params 当有uid时 修改
    // console.log(this.$route);
    const uid = this.$route.params.uid;
    if (uid) {
      this.tip = "修改";
      // 获取路由传递过来的uid获取对应的菜单数据
      this.$http.get("/api/cateinfo", { id: uid }).then(res => {
        console.log(res);
        this.info = res.data.list;
        // 匹配数据类型
        this.info.status = this.info.status == 1 ? true : false;
        this.fileList = this.info.img ? [{url:this.info.img}] : [];//显示图片
      });
    }
    //获取角色列表 , { istree: 1 }
    this.$http.get("/api/catelist", { istree: 1 }).then(res => {
      this.cates = res.data.list; //动态设置上级菜单下拉列表
    });
  },
  methods: {
    // 预览触发
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove() {},
    //文件状态改变钩子函数
    fileChange(file) {
      this.img = file.raw;
    },
    submitForm(formName) {
      // console.log(this);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证条件 满足添加
          //获取一下表单中的数据，用JSON序列化一下，防止数据变化后页面跟着变化 如果数据中有文件类型数据就不能这样操作
          let data = JSON.parse(JSON.stringify(this.info));
          // let data = this.info; //将文件类型数据提处理单独处理
          //如果现在访问的是动态路由，则执行修改操作，否则执行添加操作
          let url = "/api/cateadd";
          const uid = this.$route.params.uid;
          if (uid) {
            url = "/api/cateedit";
            data.id = uid; //添加修改时提交的必要条件 菜单id
          }
          // 处理 status字段 将布尔值 转换 true 1 , false 2
          data.status = data.status ? 1 : 2;
          // console.log(data);return;
          //处理包含文件的表单 对象 ==>表单  form-data类型
          let form = new FormData();
          for (let i in data) {
            form.append(i, data[i]);
          }
          // 判断是否有图片
          if(this.img){
            form.append('img',this.img);
          }
          //发起post请求，提交表单form数据 请求接口项目中的菜单添加接口，完成数据的保存
          this.$http.post(url, form).then(res => {
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
                this.$router.push("/category");
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
      this.$router.push("/category");
      // this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>