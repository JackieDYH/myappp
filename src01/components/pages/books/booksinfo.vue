<template>
    <form class="form-horizontal" autocomplete="off">
            <h3 class="text-center">图书信息{{ tip }}</h3>
            <div class="form-group">
                <label for="book" class="col-sm-3 control-label">图书名：</label>
                <div class="col-sm-6">
                    <input type="text" id="book" class="form-control" v-model="info.bookName">
                </div>
            </div>
            <div class="form-group">
                <label for="user" class="col-sm-3 control-label">作者：</label>
                <div class="col-sm-6">
                    <input type="text" id="user" class="form-control" v-model="info.userName">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"></label>
                <div class="col-sm-6">
                    <input type="button" value="提交" class="btn btn-primary" @click="add()">
                    <input type="button" value="重置" class="btn" @click="clear()">
                    <input type="button" value="返回" class="btn" @click="$router.push('/index/books')">
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
                bookName: '',
                userName: ''
            },
            books:JSON.parse(sessionStorage.getItem('books')) || [],
        }
    },
    methods:{
        add(){//添加
            //为空判断
            if(this.info.bookName == '' || this.info.userName == ''){
                alert("请输入完整内容再提交表单！！！");
                return false;
            }
            //判断是 提交 修改
            if(this.isidx == -1){
                //添加
                this.books.push(JSON.parse(JSON.stringify(this.info)));
            }else{
                // 修改替换
                this.books.splice(this.isidx,1,(JSON.parse(JSON.stringify(this.info))));
                // this.books[this.isidx] = this.info;
            }
            //对象的浅拷贝问题
            this.session();
            this.clear();
            this.$router.push({path:'/index/books'});
        },
        session(){//本地临时存储
            sessionStorage.setItem("books",JSON.stringify(this.books));
        },
        clear() {//重置
            this.isidx = -1; //恢复提交状态
            this.reset();
        },
        reset() {//清空
            this.info = {
                bookName: '',
                userName: ''
            }
        },
    },
    mounted(){
        console.log('userId:',this.$route.query)

        // query 询参数 路由方式获取 不然下标为0 时是假
        let idx = this.$route.query.userId;
        if(idx != undefined){
            this.info = JSON.parse(JSON.stringify(this.books[idx]));
            this.isidx = idx;
            this.tip = '修改';
        }
       
    }
}
</script>