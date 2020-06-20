<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">规格分类</el-breadcrumb-item>
      <el-breadcrumb-item>规格{{ tip }}</el-breadcrumb-item>
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
      <el-form-item label="规格名称" prop="specsname">
        <el-input v-model.trim="info.specsname" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 根据属性值动态添加 -->
      <el-form-item
        v-for="(item, index) in info.attrs"
        :label="'规格属性' + (index+1)"
        :key="item.index"
        :prop="'attrs.' + index + '.value'"
        :rules="{required: true, message: '属性不能为空', trigger: 'blur'}"
      >
        <div style="display: flex;">
          <el-input v-model="item.value" autocomplete="off"></el-input>
          <!-- <el-button
            style="margin-left:6px"
            type="primary"
            icon="el-icon-plus"
            circle
            @click.prevent="add()"
            v-if="index==0"
            :disabled="tf"
          ></el-button>-->
          <el-button
            style="margin-left:6px"
            type="danger"
            icon="el-icon-delete"
            circle
            @click.prevent="remove(index)"
          ></el-button>
        </div>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ tip }}</el-button>
        <el-button type="success" plain :disabled="tf" @click="add">添加属性</el-button>
        <el-button type="warning" plain @click="reset">重置</el-button>
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
      tf: false,
      loading: false,
      info: {
        specsname: "", //分类名
        status: true, //状态
        attrs: [{ value: "" }]
      },
      // specsAttrs: [{ value: "" }],
      cates: [], //分类列表
      rules: {
        specsname: [
          { required: true, message: "分类名称不能为空！", trigger: "blur" },
          { min: 1, max: 16, message: "请输入1到16个汉字", trigger: "blur" }
        ]
        // pid: [{ required: true, message: "请选择上级分类", trigger: "blur" }],
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
      this.$http.get("/api/specsinfo", { id: uid }).then(res => {
        console.log(res);
        this.info = res.data.list[0];
        // 匹配数据类型
        this.info.status = this.info.status == 1 ? true : false;
        // 规格属性格式处理
        let attrs = [{ value: "" }];
        this.info.attrs.map((item, id) => {
          if (id == 0) {
            attrs[0].value = item;
          } else {
            attrs.push({ value: item });
          }
        });
        // console.log(attrs,3333333333);return;
        this.info.attrs = attrs;
        this.setDisabled();
      });
    }
  },
  methods: {
    //设置添加按钮
    setDisabled() {
      if (this.info.attrs.length >= 5) {
        this.$notify({
          title: "警告",
          message: "最多可以添加 5 条属性！",
          type: "warning"
        });
        this.tf = true;
      }
    },
    //添加,key: Date.now()
    add() {
      this.info.attrs.push({ value: "" });
        this.setDisabled();
    },
    remove(i) {
      this.info.attrs.splice(i, 1);
      if (this.info.attrs.length < 5) {
        this.tf = false;
      }
    },
    reset() {
      this.info = {
        specsname: "",
        status: true,
        attrs: [{ value: "" }]
      }
      this.tf = false;
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
          let url = "/api/specsadd";
          const uid = this.$route.params.uid;
          if (uid) {
            url = "/api/specsedit";
            data.id = uid; //添加修改时提交的必要条件 菜单id
          }
          // 处理 status字段 将布尔值 转换 true 1 , false 2
          data.status = data.status ? 1 : 2;
          let arr = [];
          data.attrs.map(item => {
            arr.push(item.value);
          });
          data.attrs = arr ? arr.join(",") : ""; //处理成数据库需要的字符串
          // console.log(data);return;
          //发起post请求，提交表单form数据 请求接口项目中的菜单添加接口，完成数据的保存
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
                this.$router.push("/specs");
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
      this.$router.push("/specs");
    }
  }
};
</script>

<style scoped>
</style>