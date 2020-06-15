<template>
  <router-view id="app"></router-view>
</template>
<style>
#app{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.box {
  width: 980px;
  margin: 0 auto;
}
.box .list {
  display: flex;
  border: 1px solid honeydew;
  margin-bottom: 6px;
}
.box .list .left {
  width: 60%;
  padding-right: 10px;
}
.box .list .right {
  flex: 1;
}
.box .list .right > img {
  width: 260px;
}
</style>
<script>
export default {
  name: 'App',
  components:{
  }
}
</script>
