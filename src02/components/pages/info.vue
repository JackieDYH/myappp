<template>
  <div>
    <div class="box">
      <h1>商品详情页</h1>
      <div class="list">
        <div class="left">
          <h3>商品名称:{{ good.name }}</h3>
          <h4>商品价格:{{ good.price }}</h4>
        </div>
        <div class="right">
          <img :src="good.img" />
          <button class="btn btn-primary" @click="addCart">加入购物车</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      goodsArr: [
        {
          id: 1000001,
          img:
            "http://xue.ujiuye.com/uploads_it/2004/QuanGuo/F4A81771223NBOQT.jpg?x-oss-process=image/resize,w_285",
          name: "【直播】【系统】H5+小程序+APP多位一体 Web前端在线系统班",
          price: 3999.98
        },
        {
          id: 1000002,
          img:
            "http://xue.ujiuye.com/uploads_it/2004/QuanGuo/F4A1815762308PN2.jpg?x-oss-process=image/resize,w_285",
          name: "【基础】使用HTML+CSS3+H5开发企业官网项目",
          price: 599.6
        },
        {
          id: 1000003,
          img:
            "http://xue.ujiuye.com/uploads_it/2003/QuanGuo/F3V3658686755UE6.jpg?x-oss-process=image/resize,w_285",
          name: "【进阶】Web前端基础+小程序开发 快速制作网站页面",
          price: 399.9
        }
      ],
      good:{
        id:'',
        name:'',
        price: 0,
        img:''
      }
    }
  },
  methods:{//自定义方法
    addCart(){
      console.log(this.good);
      let good = this.good;
      good.num = 1;
      good.ischeck = true;
      //调用异步 action中方法操作 mutation 操作state中状态
      this.$store.dispatch("addCartGoodsSync",good);
      // 跳转页面
      this.$router.push('/cart');
    }
  },
  mounted(){//钩子函数
    // 方法二 自己将数据传过来
    // this.good = this.$route.query;
    // 方法一 通过传来的id查找数据
    console.log(this.$route.params.gid);
    let gid = this.$route.params.gid;
    // 查找到数据返回对应项
    this.good = this.goodsArr.find(item=>item.id == gid);
  }
}
</script>

<style>

</style>