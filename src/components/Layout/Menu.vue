<template>
  <div class="menu-container">
    <el-menu
    :key="key"
      router
      :default-active="activePath"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="item in routes">
        <el-submenu
          v-if="!item.meta.ishidden"
          :key="item.name"
          :index="item.meta.title"
        >
          <template slot="title">
            <i :class="`el-icon-${item.meta.icon}`"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <template  v-for="child in item.children">
            <el-menu-item
              v-if="!child.meta.ishidden"
              :key="child.name"
              :route="{ name: child.name }"
              :index="child.meta.title"
            >
              <i :class="`el-icon-${child.meta.icon}`"></i
              >{{ child.meta.title }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  computed: {
    activePath() {
      return this.$route.meta.title;
    },
    routes() {
      return this.$store.state.menuRoutes;
    },
  },
  mounted() {
    this.key = new Date().getTime()
  },
};
</script>

<style lang="less" scoped>
.menu-container {
  height: 100%;
  .el-menu-vertical-demo {
    width: 200px;
    height: 100%;
    overflow: hidden;
  }
  .el-submenu .el-menu-item{
    display: flex;
    align-items: center;
  }
}
</style>