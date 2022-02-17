<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import "./common/css/reset.css";
export default {
  name: "app",
};
</script>

<style lang="less">
@media only screen and (min-width: 1920px) {
  html {
    font-size: 10px !important;
  }
  #app {
    height: 108rem;
  }
}
@media only screen and (min-width: 3840px) {
  html {
    font-size: 20px !important;
  }
  #app {
    height: 60rem;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #000000ff;
  width: 192rem;
  margin: 0 auto;
}
</style>
