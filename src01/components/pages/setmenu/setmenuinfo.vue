<template>
    <form class="form-horizontal" autocomplete="off">
            <h3 class="text-center">菜单信息{{ tip }}</h3>
            <div class="form-group">
                <label for="book" class="col-sm-3 control-label">菜单名：</label>
                <div class="col-sm-6">
                    <input type="text" id="book" class="form-control" v-model="info.title">
                </div>
            </div>
            <div class="form-group">
                <label for="user" class="col-sm-3 control-label">路由：</label>
                <div class="col-sm-6">
                    <input type="text" id="user" class="form-control" v-model="info.link">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"></label>
                <div class="col-sm-6">
                    <input type="button" value="提交" class="btn btn-primary" @click="add()">
                    <input type="button" value="重置" class="btn" @click="clear()">
                    <input type="button" value="返回" class="btn" @click="$router.push('/index/setmenu')">
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
                title: '',
                link: ''
            },
            menus:JSON.parse(sessionStorage.getItem('menus')) || [],
        }
    },
    methods:{
        add(){//添加
            //为空判断
            if(this.info.title == '' || this.info.link == ''){
                alert("请输入完整内容再提交表单！！！");
                return false;
            }
            //判断是 提交 修改
            if(this.isidx == -1){
                //添加
                this.menus.push(JSON.parse(JSON.stringify(this.info)));
            }else{
                // 修改替换
                this.menus.splice(this.isidx,1,(JSON.parse(JSON.stringify(this.info))));
                // this.menus[this.isidx] = this.info;
            }
            //对象的浅拷贝问题
            this.session();
            this.clear();
            this.$router.push({path:'/index/setmenu'});
            this.$dyh.$emit('menusUp','update');//触发更新菜单数据
        },
        session(){//本地临时存储
            sessionStorage.setItem("menus",JSON.stringify(this.menus));
        },
        clear() {//重置
            this.isidx = -1; //恢复提交状态
            this.reset();
        },
        reset() {//清空
            this.info = {
                title: '',
                link: ''
            }
        },
    },
    mounted(){
        console.log('userId:'+this.$route.query.userId)
        // query 方式 不然下标为0 时是假
        let idx = this.$route.query.userId;
        if(idx != undefined){
            this.info = JSON.parse(JSON.stringify(this.menus[idx]));
            this.isidx = idx;
            this.tip = '修改';
        }
       
    }
}
</script>