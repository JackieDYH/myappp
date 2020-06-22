# src

### 使用elementUI+路由守卫=实现后台管理系统+登录+注册--20200614 git提交
---
### 完善 调用API接口重构后台界面和功能 --20200616@DYH
1. 完善菜单管理 添加 删除 修改功能的实现
2. 实现左侧的菜单实时动态改变效果 可以同步菜单状态 禁用状态
* 实现的原理是 利用$emit和$on监听实现的

---
### 完善 后台功能 --20200618@DYH
1. 完善 系统设置功能板块中
* 菜单管理    角色管理    管理员管理
* 实现：    添加    删除    修改
* 修复：管理员展示翻页功能时的bug，删除后，页码无数据问题
---
2. 添加组件守卫
* 通过用户登录跳转到后台路由地址，并实现退出登录功能
* 删除本地存储的sessionStorage信息实现相应效果

---
### 完善 优化项目 --20200618@DYH
1. 修复bug
* 修复路由组件守卫的bug，改用全局守卫验证用户权限
* 实现后台管理系统的用户登录功能，并根据用户权限，显示对应的菜单列表
2. 开启后端api接口验证
* 把token添加到请求头中，用于后台验证用户
* 封装公共请求方法http.js，统一添加验证头信息
* 重构后台系统所有需要验证的请求
3. 编写商品分类页面
* 当提交数据中包含文件类信息，就不能使用application/json提交数据
* 需要使用multipart/form-data 提交表单数据
* 在接口种添加分页的api
---
### 完善 添加 优化项目 --20200619@DYH
1. 添加商品规格、商品管理页面的相关功能实现
2. 优化项目的页面结构
3. 富文本编辑器的使用
4. 管理员登录状态判断，禁用的禁止登录
---
### 添加 完善api接口 --20200620@DYH
* 添加轮播图管理板块
* 添加限时秒杀管理
1. 添加会员管理api接口
* 添加分页api
* 添加会员删除api
* 后台实现会员注册
* 优化运行流程
---
## 使用本地存储版本 --20200622@DYH


# src01

* 后台管理系统bootstrap布局+路由守卫验证
---
# src02

* 商品展示+购物车页面+vuex


===
@JackieDYH