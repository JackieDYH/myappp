import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const list = ()=>import('@/components/pages/list');

let router = new Router({
  routes: [
    {
      path:'/',
      name:'list',
      component:list
    },
    {
      path:'/info/:gid',
      name:'info',
      component:()=>import('@/components/pages/info')
    },
    {
      path:'/good',
      name:'good',
      component:()=>import('@/components/pages/info')
    },
    {
      path:'/cart',
      name:'cart',
      component:()=>import('@/components/pages/cart')
    },
    {
      path:'*',
      redirect:'/'
    }
  ],
  // mode:"history",//路由模式 默认hash
})

export default router;