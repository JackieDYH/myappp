<template>
    <div>
        <v-header></v-header>
        <v-main></v-main>
        <v-footer></v-footer>
    </div>
</template>

<script>
import vHeader from '../views/header'
import vMain from '../views/main'
import vFooter from '../views/footer'
export default {
    components:{
        vHeader,vMain,vFooter
    },
    //当前组件的路由规则访问之前
    // beforeRouteEnter(to, from, next) {
    //     // console.log(to,1111)
    //     // console.log(from,2222)
    //     // console.log( next,3333)
    //     let userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
    //     if (userinfo) {
    //         next(); //用户已登录，则执行默认的路由规则
    //     } else {
    //         next("/login"); //用户未登录，则指向到登录的路由规则
    //     }
    // },
    //当前组件的路由规则离开时（切换到其他路由规则）
    // beforeRouteLeave(to, from, next) {
    //     console.log(this)
    //     console.log(to, 1111);
    //     console.log(from, 2222);
    //     console.log(next, 3333);
    //     next();
    // }
}
</script>