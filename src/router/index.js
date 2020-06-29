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
      path: '/login',
      name: 'login',
      component: () => import('@/components/pages/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/pages/register')
    },
    {
      path: '/',
      meta: { select: '/' },
      // name:'index', //删除父级name属性 不会再报警告了⚠
      component: () => import('@/components/pages/index'),
      children: [
        {
          path: 'home',
          //在meta中设置一个自定义属性，用来告知页面加载时，左侧哪个菜单选中
          meta: { select: '/home' },
          name: 'home',
          component: () => import('@/components/pages/home')
        },
        {
          path: 'menu',
          meta: { select: '/menu' },
          name: 'menu',
          component: () => import('@/components/pages/menu/list')
        },
        {
          path: 'menu/info',
          meta: { select: '/menu' },
          name: 'menuinfo',
          component: () => import('@/components/pages/menu/info')
        },
        {
          path: 'menu/:mid',
          meta: { select: '/menu' },
          name: 'menuinfomid',
          component: () => import('@/components/pages/menu/info')
        },
        {
          path: 'role',
          meta: { select: '/role' },
          name: 'role',
          component: () => import('@/components/pages/role/list')
        },
        {
          path: 'role/info',
          meta: { select: '/role' },
          name: 'roleinfo',
          component: () => import('@/components/pages/role/info')
        },
        {
          path: 'role/:mid',
          meta: { select: '/role' },
          name: 'roleinfomid',
          component: () => import('@/components/pages/role/info')
        },
        {
          path: 'user',
          meta: { select: '/user' },
          name: 'user',
          component: () => import('@/components/pages/user/list')
        },
        {
          path: 'user/info',
          meta: { select: '/user' },
          name: 'userinfo',
          component: () => import('@/components/pages/user/info')
        },
        {
          path: 'user/:uid',
          meta: { select: '/user' },
          name: 'userinfomid',
          component: () => import('@/components/pages/user/info')
        },
        {
          path: 'category',
          meta: { select: '/category' },
          name: 'category',
          component: () => import('@/components/pages/category/list')
        },
        {
          path: 'category/info',
          meta: { select: '/category' },
          name: 'categoryinfo',
          component: () => import('@/components/pages/category/info')
        },
        {
          path: 'category/:uid',
          meta: { select: '/category' },
          name: 'categoryinfomid',
          component: () => import('@/components/pages/category/info')
        },
        {
          path: 'specs',
          meta: { select: '/specs' },
          name: 'specs',
          component: () => import('@/components/pages/specs/list')
        },
        {
          path: 'specs/info',
          meta: { select: '/specs' },
          name: 'specsinfo',
          component: () => import('@/components/pages/specs/info')
        },
        {
          path: 'specs/:uid',
          meta: { select: '/specs' },
          name: 'specsinfomid',
          component: () => import('@/components/pages/specs/info')
        },
        {
          path: 'goods',
          meta: { select: '/goods' },
          name: 'goods',
          component: () => import('@/components/pages/goods/list')
        },
        {
          path: 'goods/info',
          meta: { select: '/goods' },
          name: 'goodsinfo',
          component: () => import('@/components/pages/goods/info')
        },
        {
          path: 'goods/:uid',
          meta: { select: '/goods' },
          name: 'goodsinfomid',
          component: () => import('@/components/pages/goods/info')
        },
        {
          path: 'banner',
          meta: { select: '/banner' },
          name: 'banner',
          component: () => import('@/components/pages/banner/list')
        },
        {
          path: 'banner/info',
          meta: { select: '/banner' },
          name: 'bannerinfo',
          component: () => import('@/components/pages/banner/info')
        },
        {
          path: 'banner/:uid',
          meta: { select: '/banner' },
          name: 'bannerinfomid',
          component: () => import('@/components/pages/banner/info')
        },
        {
          path: 'member',
          meta: { select: '/member' },
          name: 'member',
          component: () => import('@/components/pages/member/list')
        },
        {
          path: 'member/info',
          meta: { select: '/member' },
          name: 'memberinfo',
          component: () => import('@/components/pages/member/info')
        },
        {
          path: 'member/:uid',
          meta: { select: '/member' },
          name: 'memberinfomid',
          component: () => import('@/components/pages/member/info')
        },
        {
          path: 'seck',
          meta: { select: '/seck' },
          name: 'seck',
          component: () => import('@/components/pages/seck/list')
        },
        {
          path: 'seck/info',
          meta: { select: '/seck' },
          name: 'seckinfo',
          component: () => import('@/components/pages/seck/info')
        },
        {
          path: 'seck/:uid',
          meta: { select: '/seck' },
          name: 'seckinfomid',
          component: () => import('@/components/pages/seck/info')
        },
        {
          path: '',
          redirect: '/home'
        }
      ]
    },
    {
      path: '*',
      redirect: '/index'
    }
  ],
  // mode:"history",//路由模式 默认hash
})

// 引入vuex厂库
import store from '../store'
// 全局守卫
router.beforeEach((to, form, next) => {
  // console.log(to,from,next)
  //1 本地存储方式
  // let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
  
  //2 vuex方式存储厂库
  let userinfo = store.state.adminUser;
  console.log(userinfo,'userinfo初始');

  if (userinfo.token) {
    //根据用户权限，对用户访问路由验证是否合法
    // 追加首页路由权限
    userinfo.menus_url.push("/");
    userinfo.menus_url.push("/home");
    // 允许访问路由地址
    let menuarr = userinfo.menus_url;
    //处理添加的路由规则 只匹配第一级路由即可
    let nowpatharr = to.path.split('/'); // 匹配父级路由即可
    let nowpath = '/' + nowpatharr[1];
    let res = menuarr.find(item => {
      // 判断用户访问的路由在数组中是否存在
      return item == nowpath;
    });
    if (res) {
      next();
    } else {
      // alert("非法访问");
      // next("/");
      next();//执行默认路由 让其触发index.vue中的组件守卫规则弹出提醒
    }
  } else {
    if (to.fullPath == '/login' || to.fullPath == '/register') {
      next();
    } else {
      // alert("您还没有登录，请先登录！");
      next('/login');
    }
  }
})

export default router;