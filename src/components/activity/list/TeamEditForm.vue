<template>
  <div class="edit-form-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      label-position="left"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item v-for="item in formList" :key="item.name" :label="item.label" :prop="item.name">
        <el-input v-model="form[item.name]" autocomplete="off"></el-input>
      </el-form-item>
        <el-button type="primary" @click="submitForm"
          >提交</el-button
        >
    </el-form>
  </div>
</template>

<script>
export default {
  props:{
    form:Object,
  },
  data() {
    return {
      formList:[
        {
          name:'captain',
          label:'队长'
        },
        {
          name:'teamNumber1',
          label:'队员1'
        },
        {
          name:'teamNumber2',
          label:'队员2'
        },
        {
          name:'teamNumber3',
          label:'队员3'
        },
        {
          name:'teamNumber4',
          label:'队员4'
        },
        {
          name:'qq',
          label:'队长联系qq'
        }
      ],
      rules: {
        captain: { required: true, message: "请输入队长信息", trigger: "blur" },
        teamNumber1: { required: true, message: "请输入人员信息", trigger: "blur" },
        teamNumber2: { required: true, message: "请输入人员信息", trigger: "blur" },
        teamNumber3: { required: true, message: "请输入人员信息", trigger: "blur" },
        teamNumber4: { required: true, message: "请输入人员信息", trigger: "blur" },
        qq: [
          { required: true, message: "请输入qq", trigger: "blur" },
        ]
      },
    };
  },
  methods:{
    submitForm(){
      this.$refs.form.validate((valid,error) =>{
        console.log(valid,error)
        if(valid){
          this.form.id = this.form.acptain + this.form.qq;
          console.log(this.form)
          this.$emit('formSubmit',this.form)
        }else{
          this.$message({
            message: '信息有误',
            type: 'error',
            showClose: true,
            duration: 3000,
          });
          
        }
      })
      
    },
  }
};
</script>
<style >



</style>
<style lang="less" scoped>
.edit-form-container {
  margin: 0 auto;
  width: 80%;
  .el-button{
  width: 100%;
  }
  .el-select.el-select--normal{
    width: 100%;
  }
}
</style>