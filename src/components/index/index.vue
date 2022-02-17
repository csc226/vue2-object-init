<template>
  <div id="indexBox">
    <div class="title">{{hello}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hello: "欢迎使用！",
    };
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