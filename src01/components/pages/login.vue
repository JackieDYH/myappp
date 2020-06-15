<template>
  <div class="login">
    <div class="modal-dialog" style="padding-top: 10%;">
      <div class="modal-content"  style="width:80%">
        <div class="modal-header">
          <h4 class="modal-title text-center" id="myModalLabel">豪子管理系统登录</h4>
        </div>
        <div class="form-horizontal modal-body">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-3 control-label">用户名</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="user" placeholder="用户名"  autocomplete="off" v-model="userinfo.name"/>
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword3" class="col-sm-3 control-label">密码</label>
            <div class="col-sm-8">
              <input type="password" class="form-control" id="pwd" placeholder="密码"  autocomplete="off" v-model="userinfo.pwd"/>
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
              <button type="submit" class="btn btn-primary" @click="login">登录</button>
              <button type="submit" class="btn btn-default" @click="$router.push('/register')">注册</button>
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
    login(){
      let user = JSON.parse(sessionStorage.getItem('userinfo'));
      // console.log(user,this.userinfo,user.name == this.userinfo.name,user.pwd == this.userinfo.pwd)
      if(user == null){
        alert("用户未注册，请先注册！");
        this.$router.push('/register');
        return;
      }
      if(this.userinfo.name == '' || this.userinfo.pwd == ''){//null
        alert("请输入用户名密码！！！");
        this.reset();
      }else if(user.name == this.userinfo.name && user.pwd == this.userinfo.pwd){
        this.$router.push('/index/user');
      }else{
        alert("用户名密码错误！！");
      }
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