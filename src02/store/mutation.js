//修改状态的方法
export default {
    // 添加商品
    addCartGoods(state,obj){
        //判断购物车中是否有该商品
        let idx = state.cartGoods.findIndex(item=>item.id == obj.id);
        if(idx != -1){
            //存在相同商品 num++
            state.cartGoods[idx].num++;
        }else{
            state.cartGoods.push(obj);
        }
        console.log(state.cartGoods,111)
    },
    // 方式一 通过vue提供的 this.$forceUpdate(); 强制刷新页面
    upnum(state,id){
        let idx = state.cartGoods.findIndex(item=>item.id ==id);
        state.cartGoods[idx].num++;
    },
    // JSON序列号方式一 商品数量增加 +
    upNum(state,id){
        //对象深浅拷贝问题，不会触发action
        let cartGood = JSON.parse(JSON.stringify(state.cartGoods));
        let idx = cartGood.findIndex(item=>item.id == id);
        // console.log(cartGood[idx].num,111111)
        if(cartGood[idx].num >= 99){
            alert("商品最多"+cartGood[idx].num+"件");
            return false;
        }
        cartGood[idx].num++;
        state.cartGoods = cartGood;
    },
    //-
    downNum(state,id){
        let cartGood = JSON.parse(JSON.stringify(state.cartGoods));
        let idx = cartGood.findIndex(item=>item.id == id);
        // console.log(cartGood[idx].num,111111)
        if(cartGood[idx].num <= 1){
            alert("商品最少"+cartGood[idx].num+"件");
            return false;
        }
        cartGood[idx].num--;
        state.cartGoods = cartGood;
    },
    // 商品删除
    delGood(state,id){
        // let cartGood = JSON.parse(JSON.stringify(state.cartGoods));
        // console.log(state.cartGoods,2222)
        let idx = state.cartGoods.findIndex(item=>item.id == id);
        state.cartGoods.splice(idx,1);
        // console.log(state.cartGoods,3333)
    },
    // 单选
    checkGood(state,id,t){
        console.log(state.cartGoods,id,t,'单选');
        let cartGood = JSON.parse(JSON.stringify(state.cartGoods));
        let idx = cartGood.findIndex(item=>item.id == id);
        cartGood[idx].ischeck = !cartGood[idx].ischeck;
        // 遍历所有check 都为true修改chaeckAll
        state.checkAll = cartGood.every(item=>item.ischeck);
        state.cartGoods = cartGood;
    },
    // 全选反选
    checkGoods(state,t){
        console.log(state.cartGoods,t,'全选反选1');
        state.cartGoods.map(item=>item.ischeck = !t);
        state.checkAll = !t;
        console.log(state.cartGoods,'全选反选2');
    }
}