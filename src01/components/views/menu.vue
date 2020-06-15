<template>
    <div class="menu">
        <router-link v-for="(item,idx) of menus" :key="idx" :to="item.link" active-class="active">{{ item.title }}</router-link>
    </div>
</template>
<style scoped>
.menu{
    text-align: center;
    width: 140px;
    background-color: #1D2128;
}

.menu>a{
    font-size: 20px;
    padding: 8px;
    text-decoration: none;
    display: block;
    color: #fff;

}

.menu a.active{
    background-color: #f00;
    color:#fff;
}
</style>

<script>
export default {
    data(){
        return{
            menus: JSON.parse(sessionStorage.getItem('menus')) || [
                {
                    title:'用户信息',
                    link:'/index/user'
                },
                {
                    title:'图书管理',
                    link:'/index/books'
                },
                {
                    title:'菜单管理',
                    link:'/index/setmenu'
                },
                {
                    title:'系统设置',
                    link:'/index/set'
                },
            ],
        }
    },
    mounted(){
        sessionStorage.setItem("menus",JSON.stringify(this.menus));
        this.$dyh.$on('menusUp',(i)=>{ //监听菜单更新
            console.log('菜单数据跟新完成：'+i);
            this.menus = JSON.parse(sessionStorage.getItem('menus'));
        })
    },
}
</script>