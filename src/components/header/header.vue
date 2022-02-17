<template>
  <div id="headerBox">
    <div class="title">{{hello}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hello: "12欢迎使用！",
    };
  },
};
</script>
<style lang="less">
#headerBox {
  .title {
    font-size: 1.6rem;
    color: yellow;
  }
}
</style>