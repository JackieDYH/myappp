<template>
    <div id="box" class="container">
        <input type="button" value="添加" class="btn btn1 btn-primary" @click="$router.push('/index/books/add')">
        <!-- 表格 -->
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>图书名</th>
                    <th>作者</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj,idx) of books" :key="idx" :idx="idx">
                    <td>{{ obj.bookName }}</td>
                    <td>{{ obj.userName }}</td>
                    <td class="col-sm-3  text-center">
                        <button class="btn btn-primary"  @click="edit(idx,obj)">编辑</button>
                        <button class="btn btn-danger" @click="del(idx)">删除</button>
                    </td>
                </tr>
                <tr v-show="books.length==0" class="text-center">
                    <td colspan="3">尚无图书信息显示！！</td>
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
            books: JSON.parse(sessionStorage.getItem('books')) || [],
        }
    },
    methods:{//自定义函数
        edit(idx,obj){
            // console.log(idx)
            //查询参数 路由
            this.$router.push({
                // path:'/index/books/info',
                name:'addbook',//一样的效果
                query: { userId: idx,...obj }});//当key:key时变量名相同，可以简写 key。还可以将对象解构赋值给query

        },
        session(){//本地临时存储
            sessionStorage.setItem("books",JSON.stringify(this.books));
        },
        del(id){//删除
            this.books.splice(id,1);
            this.session();
        }
    }
}
</script>