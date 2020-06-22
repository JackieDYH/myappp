//异步操作mutation的方法
export default {
    // setAdeminUserSync(context){ //第一种写法
    setAdeminUserSync({ commit },info){ //第二种写法 直接引出
        // context.commit("setAdminUser",info);
        commit("setAdminUser",info);
    }
}