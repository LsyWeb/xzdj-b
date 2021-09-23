<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import cloudbase from "@cloudbase/js-sdk";
const app = cloudbase.init({
  env: "xzdj-8gx7xdmm79cf5415",
});
// const auth = app.auth();
app
  .auth({
    persistence: "session",
  })
  .anonymousAuthProvider()
  .signIn()
  .then(() => {
    // 登录成功
  })
  .catch((err) => {
    // 登录失败
    console.log(err);
  });
export default {
  name: "app",
  components: {},
  data() {
    return {
    };
  },

  methods: {

  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
