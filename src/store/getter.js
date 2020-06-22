// 计算属性
export default {
    userInfo(state){
        return state.adminUser;
    }
    // userInfo : state => state.adminUser,//第二种写法
}