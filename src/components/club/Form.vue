<template>
  <div class="form-container">
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
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
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
    form:Object
  },
  data() {
    var validateMobile = (rule, value, callback) => {
        if (value.length !== 11) {
          callback(new Error('手机号格式不正确'));
        }else{
          callback();
        }
      };
    return {
      rules: {
        name: { required: true, message: "请输入姓名", trigger: "blur" },
        grade: { required: true, message: "请选择年级", trigger: "change" },
        faculty: { required: true, message: "请选择院系", trigger: "change" },
        class: { required: true, message: "请输入班级", trigger: "blur" },
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" },
                {validator:validateMobile,trigger:"blur"}
        ],
      },
      gradeOptions:['21级','20级','19级'],
      facultyOptions:['信息系', '财经系', '医疗系', '人文系', '建工系', '艺术系', '外国语', '机电系', '航空系', '园林系', '五年制部'],
    };
  },
  methods:{
    submitForm(){
      this.$refs.form.validate((valid,error) =>{
        console.log(valid,error)
        if(valid){
          this.form.id = this.form.name + this.form.mobile;
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
.form-container {
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