<template>
    <div id="box" class="container">
        <!-- <router-link to="/index/userinfo"> -->
            <input type="button" value="添加" class="btn btn1 btn-primary" @click="$router.push('/index/user/add')">
        <!-- </router-link> -->
        <!-- 表格 -->
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj,idx) of users" :key="idx" :idx="idx">
                    <td>{{ obj.name }}</td>
                    <td>{{ obj.age }}</td>
                    <td class="col-sm-3  text-center">
                        <button class="btn btn-primary"  @click="edit(idx)">编辑</button>
                        <button class="btn btn-danger" @click="del(idx)">删除</button>
                    </td>
                </tr>
                <tr v-show="users.length==0" class="text-center">
                    <td colspan="3">尚无用户信息显示！！</td>
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
            users: JSON.parse(sessionStorage.getItem('users')) || [],
        }
    },
    methods:{//自定义函数
        edit(idx){
            // console.log(idx)
            // this.$dyh.$emit("editlist",idx);
            // this.$router.push({path:`/addlist?id=${idx}`});
            //动态路由  使用前需要router/index.js中配置
            this.$router.push('/index/user/'+idx)
            // this.$router.push({path:'/userinfo', query: { userId: idx }});
        },
        session(){//本地临时存储
            sessionStorage.setItem("users",JSON.stringify(this.users));
        },
        del(id){//删除
            this.users.splice(id,1);
            this.session();
        }
    }
}
</script>