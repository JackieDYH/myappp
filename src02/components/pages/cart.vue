<template>
  <div class="container">
            <h1 class="text-center">购物车</h1>
            <button class="btn" @click="$router.push('/')">返回首页</button>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>商品名称</th>
                        <th>商品图片</th>
                        <th>商品价格</th>
                        <th>数量</th>
                        <th>小计</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="good of getCartGoods" :key="good.id">
                        <td>
                            <!-- <input type="checkbox" v-model="good.ischeck"  @click="checkGoodSync(good.id,good.ischeck)"> -->
                            <input type="checkbox" :checked="good.ischeck" @click="checkGoodSync(good.id)">
                        </td>
                        <td>{{ good.name }}</td>
                        <td><img v-bind:src="good.img"></td>
                        <td>{{ good.price |formatPrice(2) }}</td>
                        <td>
                            <button class="btn" @click="downNumSync(good.id)">-</button>
                            [ {{ good.num }} ]
                            <!-- {{num}} -->
                            <button class="btn" @click="upNumSync(good.id)">+</button>
                            <button class="btn" @click="upnum(good.id)">+</button>
                        </td>
                        <td>{{ good.price * good.num |formatPrice(2) }}</td>
                        <td><button class="btn btn-danger" @click="delGoodSync(good.id)">删除</button></td>
                    </tr>
                    <tr v-if="getCartGoods.length == 0">
                        <td colspan="7" class="text-center">暂无商品列表信息！！！</td>
                    </tr>
                    <tr v-if="getCartGoods.length != 0">
                        <!-- :checked="checkAll" 数据双向绑定在vuex中不行 -->
                        <!-- <td><label><input type="checkbox" v-model="getCheckAll" @click="checkGoodsSync(getCheckAll)"> {{ getCheckAll ? "反选" : "全选" }} </label></td> -->
                        <td><label><input type="checkbox" :checked="getGoodsAll.checkAll" @click="checkGoodsSync(getGoodsAll.checkAll)"> {{ getCheckAll ? "反选" : "全选" }} </label></td>
                        <td colspan="6">商品总价格：{{ getGoodsAll.sum | formatPrice(2) }}</td>
                    </tr>
                </tbody>
            </table>
            
        </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return{
            good:[],
            // checkAll:false,
        }
    },
    methods:{//自定义方法
        // 助手函数操作厂库内容
        ...mapActions(['upNumSync','upnumSync','downNumSync','delGoodSync','checkGoodsSync','checkGoodSync']),
        //第二种方法
        upnum(id){
            console.log(this)
            this.upnumSync(id);
            //调用完成vuex中的actions操作方法对数据进行改变后
            //强制重新渲染页面，触发update生命周期钩子函数
            this.$forceUpdate();
        }

    },
    filters:{//局部 过滤器
        formatPrice(val,n=1){
            return '￥ '+ val.toFixed(n) +' 元';
        }
    },
    computed:{//计算
        // 方法二 通过助手函数
        ...mapGetters(['getCartGoods','getCheckAll','getGoodsAll']),
        // ...mapState(['checkAll']),
        
    },
    mounted(){
    // 方法一
    // console.log(this.$store.state.cartGoods,1111111111)
    // this.good = this.$store.state.cartGoods;
    },
}
</script>

<style scoped>
img{
    width: 100px;
}
</style>