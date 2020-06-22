// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'
// 引入Vuex状态管理器
import store from './store'

//挂载jquery
// import jq from 'jquery'
// Vue.prototype.$ = jq;
// import 'bootstrap/dist/css/bootstrap.min.css'
// 引入UI库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 把vue实例当成一个公共的容器,挂载到vue实例的原型上
Vue.prototype.$bus = new Vue();

// 引入axios 并挂载到原型上
import axios from 'axios'
Vue.prototype.$axios = axios

// 引入网络请求封装
import http from './common/js/http'
Vue.prototype.$http = http

// 引入封装的api接口文件
import apis from './common/js/apis'
Vue.prototype.$api = apis


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//挂载
  store,//挂载
  render:h =>h(App)
  // components: { App },
  // template: '<App/>'
})