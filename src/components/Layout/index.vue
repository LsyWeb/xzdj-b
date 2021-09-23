<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left">
        <Menu class="heander-container" />
      </slot>
    </div>
    <div class="right" :key="key">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu from "./Menu";
import Header from "./Header";
export default {
  data() {
    return {
      key:new Date().getTime()
    };
  },
  components: {
    Menu,
    Header,
  },
  watch:{
    $route(){
      this.key = new Date().getTime();
    }
  }
};
</script>

<style lang="less" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  display: flex;
  .left {
    width: 200px;
    overflow: hidden;
  }
  .right {
    width: calc(100vw - 200px);
    flex: 1 1 auto;
    overflow-y: auto;
  }
}
</style>