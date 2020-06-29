<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/seck' }">限时秒杀管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品秒杀{{ tip }}</el-breadcrumb-item>
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
        <el-select v-model="info.first_cateid" @change="firstChange" placeholder="请选择">
          <el-option
            v-for="item of firstcates"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="info.second_cateid" @change="secondChange" placeholder="请选择">
          <el-option
            v-for="item of secondcateid"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="秒杀商品" prop="goodsid">
        <el-select v-model="info.goodsid" placeholder="请选择">
          <el-option v-for="item of goods" :key="item.id" :label="item.goodsname" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="秒杀名称" prop="title">
        <el-input v-model.trim="info.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="秒杀时间" required>
        <!-- 
          value-format 绑定值的格式
          format	显示在输入框中的格式
          format="yyyy-MM-dd HH:mm:ss"
          value-format="timestamp" 时间戳
         -->
        <el-date-picker
          v-model="time"
          type="datetimerange"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00','23:59:59']"
        ></el-date-picker>
        <!-- <el-col :span="11" prop="begintime">
          <el-form-item prop="begintime">
            <el-time-picker
              format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择开始日期时间"
              v-model="info.begintime"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2" style="width:4%;text-align: center;">--</el-col>
        <el-col :span="11" prop="endtime">
          <el-form-item prop="endtime">
            <el-time-picker
              format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择结束日期时间"
              v-model="info.endtime"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
        </el-col>-->
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
  // new Date(this.ruleForm.startTime).getTime()
  data() {
    return {
      tip: "添加",
      loading: false,
      time:[],
      info: {
        title: "", //限时秒杀名称
        begintime: '', //开始时间
        endtime: '', //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: true //状态
      },
      firstcates: [], //一级分类列表
      secondcateid: [], //二级分类列表
      goods: [], //商品
      rules: {
        catename: [
          { required: true, message: "分类名称不能为空！", trigger: "blur" },
          { min: 1, max: 16, message: "请输入1到16个汉字", trigger: "blur" }
        ],
        // first_cateid: [{ required: true, message: "请选择上级分类", trigger: "blur" }]
        begintime: [
          { required: true, message: "请选择开始时间", trigger: "blur" }
        ],
        endtime: [
          { required: true, message: "请选择结束时间", trigger: "blur" }
        ]
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
      this.$http.get("/api/seckinfo", { id: uid }).then(res => {
        this.info = res.data.list;
        // console.log(this.info,this.time,11111111111111);return;
        // 一级分类 获取二级
        let first = this.info.first_cateid;
        let second = this.info.second_cateid;
        let goodsid = this.info.goodsid;
        this.firstChange(first, second);
        this.secondChange(second, goodsid);
        // 匹配数据类型
        this.info.status = this.info.status == 1 ? true : false;
        // 时间戳
        this.time.push(this.info.begintime);
        this.time.push(this.info.endtime);
      });
    }
    //获取一级分类列表 , { istree: 1 }
    this.getfirst();
  },
  methods: {
    // 一级分类事件
    firstChange(i, t) {
      //清空二级内容
      this.info.second_cateid = t ? t : "";
      this.info.goodsid = t ? t : "";
      //获取对应id
      this.$http.get("/api/catelist", { pid: i }).then(res => {
        this.secondcateid = res.data.list;
      });
    },
    // 二级分类事件
    secondChange(s, t) {
      this.info.goodsid = t ? t : "";
      this.$http.get("/api/goodslist", { sid: s }).then(res => {
        console.log(res, 111);
        this.goods = res.data.list;
      });
    },
    // 获取信息
    getfirst() {
      this.$http.get("/api/catelist", { pid: 0 }).then(res => {
        this.firstcates = res.data.list; //动态设置上级菜单下拉列表
      });
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
          let url = "/api/seckadd";
          const uid = this.$route.params.uid;
          if (uid) {
            url = "/api/seckedit";
            data.id = uid; //添加修改时提交的必要条件 菜单id
          }
          // 处理 status字段 将布尔值 转换 true 1 , false 2
          data.status = data.status ? 1 : 2;
          // 转换成时间戳存储
          // data.begintime = new Date(this.time[0]).getTime();
          // data.endtime = new Date(this.time[1]).getTime();
          // 不需要转换时间戳，组件中直接处理成时间戳了
          data.begintime = this.time[0];
          data.endtime = this.time[1];
          // console.log(this.time[0],this.time[1],data);return;

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
                this.$router.push("/seck");
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
      this.$router.push("/seck");
    }
  }
};
</script>

<style scoped>
</style>