<template>
  <div class="login-container">
    <el-form
      class="form"
      :model="form"
      ref="form"
      status-icon
      :rules="rules"
      label-width="80px"
      :inline="false"
      size="normal"
      label-position="left"
      
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit"  @keydown.enter="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {setStorage} from '../api/user'
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
      rules: {
        name: { required: true, message: "请输入账号", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" },
      },
    };
  },
  methods: {
    async onSubmit() {
      console.log("提交");
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (
            (this.form.name === "liushuaiyang" ||
              this.form.name === "admin_one" ||
              this.form.name === "admin_two") &&
            this.form.password === "xzdjyyds"
          ) {
            this.$message({
              message: "登录成功",
              type: "success",
              duration: 3000,
            });
            setStorage(this.form.name);
            this.$store.commit('setUser', this.form.name)
            this.$router.push('/club/list');
          }
          else{
            this.$message({
              message: "账号或密码错误",
              type: "error",
              duration: 3000
            })
          }
        } else {
          this.$message({
            message: "信息未填写完整",
            type: "error",
            duration: 3000,
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  margin-left: -80px;
  .form {
    margin-top: 50px;
    text-align: center;
  }
}
</style>