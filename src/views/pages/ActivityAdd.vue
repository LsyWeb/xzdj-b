<template>
  <div class="activity-add-container">
    <Form :formData="formData" @formSubmit="formSubmit" />
  </div>
</template>

<script>
import cloudbase from "@cloudbase/js-sdk";
const app = cloudbase.init({
  env: "xzdj-8gx7xdmm79cf5415",
});
const db = app.database();
const _ = db.command;

import Form from "@/components/activity/add/Form";
export default {
  components: {
    Form,
  },
  data() {
    return {
      formData: {
        title: "",
        desc: "",
        total: "",
        regType:"",
        teamList:[],
        teamNum:'',
        date: "",
        startTime: "",
        endTime: "",
        faculty: "",
        qunNum: "",
        qrcode: "",
      },
    };
  },
  methods: {
    // 表单提交
    formSubmit(form) {
      console.log(form);
      form.id = form.title + new Date().getTime();
      db.collection("community")
        .doc("activityList")
        .update({
          list: _.unshift(form),
        })
        .then(() => {
          this.$message({
            message: "活动添加成功",
            type: "success",
            showClose: true,
            duration: 3000,
          });
          this.$router.push({ name: "ActivityList" });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.activity-add-container {
  width: 100%;
  margin: 0 auto;
  margin-top: 100px;
}
</style>