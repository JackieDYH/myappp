#商品展示+购物车页面+vuex
20200613
遇到问题：
    1 在使用state中数据采用v-model双向绑定时出现问题，vuex是单项数据流
    2 对象的深浅拷贝问题，在改变对象中数据时，vuex无法监测到数据的改变，通过深拷贝即可检测到
        1 通过转换成字符串再转换成对象 JSON序列化来实现
        2 找到对应的对象去进行操作赋值
        3 使用vue提供的强制刷新页面 数据改变，页面不刷新
            this.$forceUpdate() 方法实现 methods方法中使用