// 计算属性
export default {
    getCartGoods(state){
        return state.cartGoods;
    },
    //不用
    getCheckAll(state){
        return state.checkAll;
    },
    getGoodsAll(state){
        let sum = 0;
        state.cartGoods.map(item=>{
            if(item.ischeck){
                sum += item.price * item.num;
            }
        });
        state.checkAll = state.cartGoods.every(item=>item.ischeck);
        let checkAll = state.checkAll
        console.log(sum,state.checkAll,checkAll,'sum+all');
        return {sum,checkAll};
    }
}