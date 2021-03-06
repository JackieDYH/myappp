// 状态管理器Vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入状态
import state from './state'
// 引入修改状态的方法
import mutations from './mutation'
// 引入异步操作mutation的方法
import actions from './action'
// 引入计算属性
import getters from './getter'
// 引入模块

// 实例化Vuex厂库
export default new Vuex.Store({
    state,//初始状态
    mutations,//自定义方法 同步操作
    actions,//调用mutations方法 异步
    getters,//计算属性
    modules:{//模块

    }

})