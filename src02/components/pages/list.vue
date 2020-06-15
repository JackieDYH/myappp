<template>
  <div>
    <div class="box">
      <h1>商品列表页</h1>
      <div class="list" v-for="good of goodsArr" :key="good.id" @click="toinfo(good.id,good)">
        <div class="left">
          <h3>商品名称:{{ good.name }}</h3>
          <h4>商品价格:{{ good.price }}</h4>
        </div>
        <div class="right">
          <img :src="good.img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      ]
    };
  },
  methods:{//自定义方法
    toinfo(id,good){
      console.log(id,this.$router)
      // 方法一
      this.$router.push('/info/'+id);
      // 方法二 传递数据
      // this.$router.push({name:'good',query:{...good}});
    }
  }
};
</script>

<style scoped>

</style>