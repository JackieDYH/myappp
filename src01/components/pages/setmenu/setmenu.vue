<template>
    <div id="box" class="container">
        <input type="button" value="添加" class="btn btn1 btn-primary" @click="$router.push('/index/setmenu/add')">
        <!-- 表格 -->
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>菜单名</th>
                    <th>路由</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj,idx) of menus" :key="idx" :idx="idx">
                    <td>{{ obj.title }}</td>
                    <td>{{ obj.link }}</td>
                    <td class="col-sm-3  text-center">
                        <button class="btn btn-primary"  @click="edit(idx)">编辑</button>
                        <button class="btn btn-danger" @click="del(idx)">删除</button>
                    </td>
                </tr>
                <tr v-show="menus.length==0" class="text-center">
                    <td colspan="3">尚无菜单信息显示！！</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
<style scoped>
.btn1{
    margin:20px 0 10px;
}

</style>

<script>
export default {
    data(){
        return{
            menus: JSON.parse(sessionStorage.getItem('menus')) || [],
        }
    },
    methods:{//自定义函数
        edit(idx){
            // console.log(idx)
            this.$router.push({
                path:'/index/setmenu/add',
                query: { userId: idx }});

        },
        session(){//本地临时存储
            sessionStorage.setItem("menus",JSON.stringify(this.menus));
        },
        del(id){//删除
            this.menus.splice(id,1);
            this.session();
            this.$dyh.$emit('menusUp','del');//触发更新菜单数据
        }
    }
}
</script>