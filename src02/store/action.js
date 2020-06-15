//异步操作mutation的方法
export default {
    //添加商品异步操作
    addCartGoodsSync(context,obj){
        // console.log(context,obj)
        context.commit("addCartGoods",obj);
    },
    // 方式一 通过vue提供的 this.$forceUpdate(); 强制刷新页面
    upnumSync(context,id){
        context.commit('upnum',id);
    },
    //JSON序列号方式一 增加商品数量num
    upNumSync(context,id){
        context.commit("upNum",id);
    },
    //减少商品数量num
    downNumSync(context,id){
        context.commit("downNum",id);
    },
    // 删除商品
    delGoodSync(context,id){
        // console.log(id,111111)
        context.commit("delGood",id);
    },
    // 单选 不用
    checkGoodSync(context,id,t){
        console.log(t,id,'单选');
        context.commit("checkGood",id,t)
    },
    // 全选反选
    checkGoodsSync(context,t){
        console.log(t,'全选反选');
        context.commit("checkGoods",t);
    }
}