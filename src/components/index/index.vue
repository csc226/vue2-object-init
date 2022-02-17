<template>
  <div id="indexBox">
    <!-- 头部 -->
    <Header></Header>

    <div class="title">{{hello}}</div>
  </div>
</template>

<script>
import Header from "../header/header.vue";
export default {
  data() {
    return {
      hello: "11欢迎使用！",
    };
  },
  components: {
    Header,
  },
};
</script>
<style lang="less">
#indexBox {
  .title {
    font-size: 1.6rem;
    color: yellow;
  }
}
</style>