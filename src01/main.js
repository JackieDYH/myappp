// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//挂载jquery
// import jq from 'jquery'
// Vue.prototype.$ = jq;
import 'bootstrap/dist/css/bootstrap.min.css'

// 把vue实例当成一个公共的容器,挂载到vue实例的原型上
Vue.prototype.$dyh = new Vue();

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
