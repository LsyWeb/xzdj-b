<template>
  <div class="add-form-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      label-position="left"
      ref="form"
      label-width="85px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-input v-model="form.class" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="qq" prop="qq">
        <el-input v-model="form.qq"></el-input>
      </el-form-item>
      
      <el-form-item  label="年级" prop="grade" size="normal">
        <el-select v-model="form.grade" placeholder="请选择年级" > 
          <el-option
            v-for="item in gradeOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="院系" prop="faculty" size="normal">
        <el-select v-model="form.faculty" placeholder="请选择院系" > 
          <el-option
            v-for="item in facultyOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:{
    form:Object,
    facultyOptions:Array
  },
  data() {
    return {
      rules: {
        name: { required: true, message: "请输入姓名", trigger: "blur" },
        grade: { required: true, message: "请选择年级", trigger: "change" },
        faculty: { required: true, message: "请选择院系", trigger: "change" },
        class: { required: true, message: "请输入班级", trigger: "blur" },
        qq: [{ required: true, message: "请输入手机号", trigger: "blur" },],
      },
      gradeOptions:['21级','20级','19级'],
    };
  },
  methods:{
    submitForm(){
      this.$refs.form.validate((valid,error) =>{
        console.log(valid,error)
        if(valid){
          this.form.id = this.form.name + this.form.qq;
          this.form.fac = [this.form.grade,this.form.faculty]
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
.add-form-container {
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