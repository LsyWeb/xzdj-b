<template>
  <div class="form-container">
    <el-form
      :rules="rules"
      :model="formData"
      status-icon
      :inline="false"
      ref="form"
      class="form"
      label-width="100px"
      size="normal"
      
    >
      <div class="wrap">
        <div>
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" placeholder="请输入活动标题"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="formData.desc" placeholder="请输入活动描述"></el-input>
          </el-form-item>
          <el-form-item label="总人数" prop="total">
            <el-input v-model.number="formData.total" placeholder="请输入活动参加总人数"></el-input>
          </el-form-item>
          <el-form-item label="报名方式" prop="regType">
            <el-select v-model="formData.regType" placeholder="请选择报名方式">
              <el-option v-for="item in regTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="队伍人数" prop="teamNum">
            <el-input v-model.number="formData.teamNum" placeholder="请输入队伍人数"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="日期" prop="date">
            <el-date-picker
              v-model="formData.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="院系" prop="faculty">
            <el-select v-model="formData.faculty" multiple placeholder="请选择可以参加活动的院系">
              <el-option v-for="item in facultyOptions" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="比赛群号" prop="qunNum">
            <el-input v-model="formData.qunNum" placeholder="请输入活动的比赛群号"></el-input>
          </el-form-item>
          <el-form-item label="群二维码" prop="qrcode">
            <el-upload
              action="#"
              list-type="picture-card"
              :on-change="qrcodeUrlChange"
              :auto-upload="false"
              :file-list="fileList"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" height="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import cloudbase from "@cloudbase/js-sdk";
const app = cloudbase.init({
  env: "xzdj-8gx7xdmm79cf5415"
});

export default {
  props: {
    formData: Object,
    type:String
  },
  data() {
    const validateTeamNum = (rule, value, callback)=>{
      if(this.formData.regType == 'team'){
        if(!value){
          callback(new Error('报名方式为团队时，队伍人数必填'));
        }else{
          callback();
        }
      }
    }
    return {
      formItems: [
        { label: "标题", prop: "title" },
        { label: "描述", prop: "desc" },
        { label: "总人数", prop: "total" },
        { label: "开始时间", prop: "startTime" },
        { label: "结束时间", prop: "endTime" },
        { label: "院系", prop: "faculty" },
        { label: "比赛群号", prop: "qunNum" },
        { label: "群二维码", prop: "qrcode" }
      ],
      rulesFrom:{
        
      },
      rules: {
        title: { required: true, message: "请输入标题", trigger: "blur" },
        desc: { required: true, message: "描述不能为空", trigger: "blur" },
        total: [
          { required: true, message: "请输入总人数", trigger: "blur" },
          { type: 'number',  message: "必须填写数字", trigger: "change" },
        ],
        regType: { required: true, message: "请选择报名方式", trigger: "blur" },
        teamNum: [
          { validator: validateTeamNum, trigger: 'blur' },
          { type: 'number',  message: "必须填写数字", trigger: "change" },
        ],
        date: { required: true, message: "请选择日期", trigger: "blur" },
        faculty: { required: true, message: "请选择院系", trigger: "blur" },
        qunNum: [
          { required: true, message: "请输入比赛群号", trigger: "blur" },
        ],
        qrcode: {
          required: true,
          message: "请上传比赛群的二维码",
          trigger: "blur"
        }
      },
      facultyOptions: [
        "信息系",
        "财经系",
        "医疗系",
        "人文系",
        "建工系",
        "艺术系",
        "外国语",
        "机电系",
        "航空系",
        "园林系",
        "五年制部"
      ],
      regTypeOptions: [{value:"team",label:'团队'}, {value:"personal",label:'个人'}],
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  watch: {
    dialogImageUrl() {
      console.log(this.dialogImageUrl);
    },
  },
  methods: {
    // 选择文件
    qrcodeUrlChange(file, fileList) {
      console.log(file, fileList);
      app
        .uploadFile({
          cloudPath: `社团/activity/${this.formData.title}-${file.name}`,
          filePath: file.raw
        })
        .then(result => {
          // 上传结果
          this.$message({
            message: "图片上传成功",
            type: "success",
            showClose: true,
            duration: 3000
          });
          this.formData.qrcode = result.fileID;
          console.log(result);
        });
    },
    // 删除已选中的图片
    handleRemove(file) {
      console.log(file);
      this.fileList = this.fileList.filter(item => file == item);
    },
    // 预览上传的图片
    handlePictureCardPreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    // 表单提交
    onSubmit() {
      console.log(this.formData);
      // 对表单信息做最后的修改
      this.formData.startTime = this.formData.date[0];
      this.formData.endTime = this.formData.date[1];
      console.log(this.formData.startTime, this.formData.endTime);
      
      if(!this.type){
        this.formData.regList = [];//修改活动信息，不能清空报名列表
        this.formData.teamList = [];
      }
      
      this.$refs.form.validate((valid, error) => {
        if (valid) {
          console.log(valid);
          if(this.type){
            this.$emit('editActivitySubmit',this.formData)
          }else{
            this.$emit("formSubmit", this.formData);
          }
        } else {
          const err = Object.values(error)[0][0].message;
          this.$message({
            message: err,
            type: "error",
            showClose: true,
            duration: 3000
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.form-container .wrap {
  .el-upload-list--picture-card .el-upload-list__item {
    width: 90px;
    height: 90px;
    > div {
      height: 100%;
    }
  }
  .el-upload--picture-card {
    width: 90px;
    height: 90px;
    line-height: 100px;
  }
}
</style>
<style lang="less" scoped>
.form-container {
  margin: 0 auto;
  width: 80%;
  text-align: center;
  .wrap {
    display: flex;
    justify-content: center;
    > div:nth-of-type(1) {
      margin-right: 20px;
    }
    .el-date-editor.el-range-editor {
      width: 100%;
      margin: 0 auto;
    }

    .el-form-item {
      width: 400px;
    }
  }

  .el-button {
    width: 200px;
  }
  .el-select.el-select--normal {
    width: 100%;
  }
}
</style>