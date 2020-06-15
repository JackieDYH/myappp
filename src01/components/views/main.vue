<template>
    <div class="main">
        <v-menu></v-menu>
        <!-- 右组件出口 -->
      <router-view class="right"></router-view>
    </div>
</template>

<style scoped>
.main{
    display: flex;
    flex: 1;
    /* background-color: #E4E4E3; */
}
.right{
    flex: 1;
}
</style>

<script>
import vMenu from './menu'
export default {
    components:{
        vMenu
    }
}
</script>