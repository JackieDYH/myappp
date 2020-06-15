<template>
  <div class="login">
    <div class="modal-dialog" style="padding-top: 10%;">
      <div class="modal-content"  style="width:80%">
        <div class="modal-header">
          <h4 class="modal-title text-center" id="myModalLabel">豪子管理系统注册</h4>
        </div>
        <div class="form-horizontal modal-body">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-3 control-label">用户名</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="user" placeholder="用户名"  autocomplete="off" v-model.trim="userinfo.name"/>
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword3" class="col-sm-3 control-label">密码</label>
            <div class="col-sm-8">
              <input type="password" class="form-control" id="pwd" placeholder="密码"  autocomplete="off" v-model.trim="userinfo.pwd"/>
            </div>
          </div>
          <!-- <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                <div class="checkbox">
                    <label>
                    <input type="checkbox"> Remember me
                    </label>
                </div>
                </div>
          </div>-->
          <div class="form-group">
            <div class="col-sm-offset-3 col-sm-10">
              <button type="submit" class="btn btn-primary" @click="add">注册</button>
              <button type="submit" class="btn btn-default" @click="$router.push('/login')">登录</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
html,body,.login{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 20, 70, .2);
}
</style>
<script>
export default {
  data(){
    return{
      userinfo:{
        name:'',
        pwd:''
      }
    }
  },
  methods:{//自定义方法
    add(){
      if(this.userinfo.name =='' || this.userinfo.pwd ==''){
        alert('用户名或密码不能为空！！！');
        this.reset();
      }else{
        this.session();
        this.$router.push('/login');
      }
    },
    session(){//本地临时存储
        sessionStorage.setItem("userinfo",JSON.stringify(this.userinfo));
    },
    reset() {//清空
        this.userinfo = {
          name:'',
          pwd:''
        }
    },
  }
}
</script>