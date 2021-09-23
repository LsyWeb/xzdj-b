<template>
  <div class="club-add-container">
    <div class="content">
      <Form :form="formAddData" @formSubmit="formAddSubmit" />
    </div>
  </div>
</template>

<script>
import cloudbase from "@cloudbase/js-sdk";
import Form from "@/components/club/Form";
const app = cloudbase.init({
  env: "xzdj-8gx7xdmm79cf5415",
});
const db = app.database();
const _ = db.command;
export default {
  components: {
    Form,
  },
  data() {
    return {
      formAddData: {
        name: "",
        id: "",
        grade:"",
        faculty:"",
        class: "",
        mobile: "",
      },
    };
  },
  methods: {
    formAddSubmit(form) {
      console.log(form);
      db.collection("community")
        .doc("clubList")
        .update({
          data: _.push(form),
        })
        .then((res) => {
          console.log(res);
          this.$message({
            message: '新增成功',
            type: 'success',
            showClose: true,
            duration: 3000,
          });
          this.$router.push({name:'ClubList'})
        }).catch(res =>{
          console.log(res)
        })
    },
  },
};
</script>

<style lang="less" scoped>
.club-add-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  .content{
    width: 30vw;
  }
}
</style>