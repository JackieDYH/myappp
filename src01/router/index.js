import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/pages/index'

import login from '@/components/pages/login'
import register from '@/components/pages/register'

// import set from '@/components/pages/set/set'
// 路由懒加载
const set = ()=>import ('@/components/pages/set/set')

// import setmenu from '@/components/pages/setmenu/setmenu'
// import setmenuinfo from '@/components/pages/setmenu/setmenuinfo'
const setmenu = ()=>import ('@/components/pages/setmenu/setmenu')
const setmenuinfo = ()=>import ('@/components/pages/setmenu/setmenuinfo')

// import books from '../components/pages/books/books'
// import booksinfo from '../components/pages/books/booksinfo'
const books = ()=>import ('@/components/pages/books/books')
const booksinfo = ()=>import ('@/components/pages/books/booksinfo')

// import user from '../components/pages/user/user'
// import userinfo from '../components/pages/user/userinfo'
const user = ()=>import ('@/components/pages/user/user')
const userinfo = ()=>import ('@/components/pages/user/userinfo')

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path:'/index',
      component:index,
      alias:'/souye',//路由别名 同path功能一样
      name:'index',//路由命名 会自动拼接路径
      children:[//二级 不加 /
        {
          path:'set',
          name:'set',
          component:set
        },
        {
          path:'setmenu',
          name:'setmenu',
          component:setmenu
        },
        {
          path:'setmenu/add',
          component:setmenuinfo
        },
        {
          path:'books',
          name:'books',
          component:books
        },
        {
          path:'books/add',
          name:'addbook',
          component:booksinfo
        },
        {
          path:'user',
          name:'user',
          component:user
        },
        {
          path:'user/add',
          name:'adduser',
          component:userinfo,
          // beforeEnter:(to,from,next)=>{
          //   console.log(to,111);
          //   console.log(from,222);
          //   console.log(next,333);
          // }
        },
        {
          path:'user/:uid',//配置动态路由
          name:'uiduser',
          component:userinfo
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/register',
      name:'register',
      component:register
    },
    {
      path:'*',
      redirect:'/index/user'
    }
  ],
  // mode:"history",//路由模式 默认hash
})

//设置全局守卫
router.beforeEach((to,from,next)=>{
  console.log(to,'1')
  console.log(from,'2');
  // console.log(next,'3');
  // next();//执行默认路由规则
  let userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
  //1.如果用户已登录，那么就执行默认的路由规则
  //2.如果用户未登录，并且访问的不是登录页面，则跳转到登录页面
  //                 如果访问的是登录页面，就是行默认的路由规则
  if(userinfo){
    console.log("用户已经登录");
    next();
  }else{
    if(to.fullPath == '/login' || to.fullPath == '/register'){
      next();
    }else{
      alert("您还没有登录，请先登录！");
      next('/login');
    }
  }
});
// 全局后置守卫
// router.afterEach((to,from)=>{
//   console.log(to,11);
//   console.log(from,22);
// })

export default router;