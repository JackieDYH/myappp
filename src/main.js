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

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 把vue实例当成一个公共的容器,挂载到vue实例的原型上
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h =>h(App)
  // components: { App },
  // template: '<App/>'
})
