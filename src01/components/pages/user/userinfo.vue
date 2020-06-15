<template>
    <form class="form-horizontal" autocomplete="off">
            <h3 class="text-center">用户信息{{ tip }}</h3>
            <div class="form-group">
                <label for="name" class="col-sm-3 control-label">姓名：</label>
                <div class="col-sm-6">
                    <input type="text" id="name" class="form-control" v-model="info.name">
                </div>
            </div>
            <div class="form-group">
                <label for="age" class="col-sm-3 control-label">年龄：</label>
                <div class="col-sm-6">
                    <input type="text" id="age" class="form-control" v-model="info.age">
                </div>
            </div>
            <div class="form-group">
                <label for="age" class="col-sm-3 control-label"></label>
                <div class="col-sm-6">
                    <input type="button" value="提交" class="btn btn-primary" @click="add()">
                    <input type="button" value="重置" class="btn" @click="clear()">
                    <input type="button" value="返回" class="btn" @click="$router.push('/index/user')">
                </div>
            </div>
        </form>
</template>

<script>
export default {
    data(){
        return{
            tip:'添加',
            isidx:-1,//记录数组项
            info:{
                name:'',
                age:''
            },
            users:JSON.parse(sessionStorage.getItem('users')) || [],
        }
    },
    // 动态路由的参数值发生变化时，会自动执行
    // beforeRouteUpdate(to,from,next){
    //     console.log(this);
    //     console.log(to);
    //     console.log(from);
    //     console.log(next);
    // },
    methods:{
        add(){//添加
            //为空判断
            if(this.info.name == '' || this.info.age == ''){
                alert("请输入完整内容再提交表单！！！");
                return false;
            }
            //判断是 提交 修改
            if(this.isidx == -1){
                //添加
                this.users.push(JSON.parse(JSON.stringify(this.info)));
            }else{
                // 修改替换
                this.users.splice(this.isidx,1,(JSON.parse(JSON.stringify(this.info))));
                // this.users[this.isidx] = this.info;
            }
            //对象的浅拷贝问题
            this.session();
            this.clear();
            this.$router.push({path:'/index/user'});
        },
        session(){//本地临时存储
            sessionStorage.setItem("users",JSON.stringify(this.users));
        },
        clear() {//重置
            this.isidx = -1; //恢复提交状态
            this.reset();
        },
        reset() {//清空
            this.info = {
                name: '',
                age: ''
            }
        },
    },
    mounted(){
        console.log('uid:'+this.$route.params.uid);
        //动态路由获取
        let idx = this.$route.params.uid;
        // console.log(typeof idx)
        if(idx){
            this.info = JSON.parse(JSON.stringify(this.users[idx]));
            this.isidx = idx;
            this.tip = '修改';
        }
        // this.info = this.users.find(item=>{
        //     return item.id == uid;
        //     // if(item.id == uid){
        //     //     return true;
        //     // }
        // })
        // if(this.$route.query.userId == undefined)return false;
        // console.log('userId:'+this.$route.query.userId)
        // let idx = this.$route.query.userId;
        // console.log(this.getData('id'))
        
        // this.$dyh.$on("editlist",(id)=>{//监听编辑按钮
        //     console.log(id,this.info,'22222222222');
        //     // 深浅拷贝
        //     this.info = JSON.parse(JSON.stringify(this.users[id]));
        //     console.log(this.info)
        //     this.isidx = id; //赋值数组下标
        // });
    }
}
</script>