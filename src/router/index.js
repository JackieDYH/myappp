import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// const index = ()=>import('@/components/pages/index');

let router = new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:()=>import('@/components/pages/login')
    },
    {
      path:'/register',
      name:'register',
      component:()=>import('@/components/pages/register')
    },
    {
      path:'/',
      meta:{select:'/'},
      // name:'index', //删除父级name属性 不会再报警告了⚠
      component:()=>import('@/components/pages/index'),
      children:[
        {
          path:'home',
          //在meta中设置一个自定义属性，用来告知页面加载时，左侧哪个菜单选中
          meta:{select:'/home'},
          name:'home',
          component:()=>import('@/components/pages/home')
        },
        {
          path:'list',
          meta:{select:'/list'},
          name:'list',
          component:()=>import('@/components/pages/menu/list')
        },
        {
          path:'list/info',
          meta:{select:'/list'},
          name:'listinfo',
          component:()=>import('@/components/pages/menu/info')
        },
        {
          path:'user',
          meta:{select:'/user'},
          name:'user',
          component:()=>import('@/components/pages/user/list')
        },
        {
          path:'user/info',
          meta:{select:'/user'},
          name:'userinfo',
          component:()=>import('@/components/pages/user/info')
        },
        {
          path:'',
          redirect:'/home'
        }
      ]
    },
    {
      path:'*',
      redirect:'/index'
    }
  ],
  // mode:"history",//路由模式 默认hash
})

export default router;