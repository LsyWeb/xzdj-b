<template>
  <div class="header-container">
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, i) in path" :key="i">{{
        item.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧用户名展示 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        欢迎{{user ?user:""}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link class="login" to="/login"  @click.native="handleLoginOut">退出登录</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// userName需要 从仓库获取
export default {
  data() {
    return {};
  },
  computed: {
    path() {
      return this.$route.matched;
    },
    user(){
      return this.$store.state.user;
    }
  },
  created(){
    // console.log(this.$route)
  },
  methods: {
    async handleLoginOut(){
      console.log('退出')
      await this.$store.dispatch('loginOut');
    }
  },
};
</script>

<style>
.el-dropdown-link {
    cursor: pointer;
  }
  a.login{
    color: #000;
    text-decoration: none;
  }
</style>

<style lang="less" scoped>
.header-container {
  height: 50px;
  width: 100%;
  padding: 10px 25px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #eee;
}
</style>