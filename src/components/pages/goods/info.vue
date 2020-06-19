<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
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
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="info.first_cateid" placeholder="请选择" @change="cateChange">
          <el-option v-for="item of cates" :key="item.id" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="info.second_cateid" placeholder="请选择">
          <el-option
            v-for="item of secondCates"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model.trim="info.goodsname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="info.price" autocomplete="off" type="number"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" prop="market_price">
        <el-input v-model.number="info.market_price" autocomplete="off" type="number"></el-input>
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
      <el-form-item label="商品描述">
          <div id="edit" style="width:720px"></div>
        <!-- <el-input v-model.trim="info.description" autocomplete="off"></el-input> -->
      </el-form-item>
      <el-form-item label="商品规格" prop="specsid">
        <el-select v-model="info.specsid" placeholder="请选择" @change="specsChange">
          <el-option
            v-for="item of specsarr"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格属性" prop="specsattr">
        <el-select v-model="info.specsattr" multiple placeholder="请选择">
          <el-option v-for="(item,idx) of specsattrs" :key="idx" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品" prop="status">
        <el-radio v-model="info.isnew" :label="1">是</el-radio>
        <el-radio v-model="info.isnew" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="是否热卖" prop="status">
        <el-radio v-model="info.ishot" :label="1">是</el-radio>
        <el-radio v-model="info.ishot" :label="2">否</el-radio>
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
//引入富文本编辑器
import E from "wangeditor";
export default {
  data() {
    return {
      editor: null, //富文本编辑器
      dialogVisible: false,
      dialogImageUrl: "",
      fileList: [], //展示图片 修改时
      tip: "添加",
      loading: false,
      info: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: true //状态
      },
      img: "", //图片
      cates: [], //一级分类列表
      secondCates: [], //二级
      specsarr: [], //商品规格id
      specsattrs: [], //规格属性
      rules: {
        goodsname: [
          { required: true, message: "商品名称不能为空！", trigger: "blur" }
        ],
        first_cateid: [
          { required: true, message: "请选择分类", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" }
        ]
      }
    };
  },
  //生命周期函数挂载完后执行
  mounted() {
      //使用富文本编辑器
    this.editor = new E("#edit");
    this.editor.create();

    // 查看路由 params 当有uid时 修改
    // console.log(this.$route);
    const uid = this.$route.params.uid;
    if (uid) {
      this.tip = "修改";
      // 获取路由传递过来的uid获取对应的菜单数据
      this.$http.get("/api/goodsinfo", { id: uid }).then(res => {
        console.log(res);
        this.info = res.data.list;
        // 一级分类 获取二级
        let cateid = this.info.second_cateid;
        this.cateChange(this.info.first_cateid, cateid);
        // 商品规格
        let specs = this.info.specsattr;
        this.specsChange(this.info.specsid, specs);
        // 匹配数据类型
        this.info.status = this.info.status == 1 ? true : false;
        this.fileList = this.info.img ? [{ url: this.info.img }] : []; //显示图片
        this.info.specsattr = this.info.specsattr
          ? this.info.specsattr.split(",")
          : []; //处理多选
        this.editor.txt.html(this.info.description);//富文本读取
      });
    }
    //获取一级分类 , { istree: 1 }
    this.$http.get("/api/catelist", { pid: 0 }).then(res => {
      this.cates = res.data.list; //动态设置上级菜单下拉列表
    });
    //获取商品规格信息
    this.$http.get("/api/specslist").then(res => {
      console.log(res);
      this.specsarr = res.data.list; //动态设置上级菜单下拉列表
    });
  },
  methods: {
    //商品规格
    specsChange(i, t) {
      this.info.specsattr = t ? t : "";
      //获取对应id
      this.$http.get("/api/specsinfo", { id: i }).then(res => {
        if (res.data.code == 200) {
          this.specsattrs = res.data.list ? res.data.list[0].attrs : [];
        }
      });
    },
    //分类信息
    cateChange(i, t) {
      //清空二级内容
      this.info.second_cateid = t ? t : "";
      //获取对应id
      this.$http.get("/api/catelist", { pid: i }).then(res => {
        console.log(res);
        this.secondCates = res.data.list;
      });
    },
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
          data.description = this.editor.txt.html();//富文本赋值
          //如果现在访问的是动态路由，则执行修改操作，否则执行添加操作
          let url = "/api/goodsadd";
          const uid = this.$route.params.uid;
          if (uid) {
            url = "/api/goodsedit";
            data.id = uid; //添加修改时提交的必要条件 菜单id
          }
          // 处理 status字段 将布尔值 转换 true 1 , false 2
          data.status = data.status ? 1 : 2;
          data.specsattr = data.specsattr ? data.specsattr.join(",") : "";
          //   console.log(data);return;
        //   console.log(this.editor.txt.html());return;
          //处理包含文件的表单 对象 ==>表单  form-data类型
          let form = new FormData();
          for (let i in data) {
            form.append(i, data[i]);
          }
          // 判断是否有图片
          if (this.img) {
            form.append("img", this.img);
          }
          //   console.log(form.get('goodsname'))
          //发起post请求，提交表单form数据 请求接口项目中的菜单添加接口，完成数据的保存
          this.$http.post(url, form).then(res => {
            console.log(res);
            // 加载效果
            this.loading = true;
            if (res.data.code == 200) {
              this.$notify({
                title: "成功",
                message: `管理员已经${this.tip}成功!`,
                type: "success"
              });
              setTimeout(() => {
                this.loading = false;
                this.$router.push("/goods");
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
      this.$router.push("/goods");
      // this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>