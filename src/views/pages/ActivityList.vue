<template>
  <div class="activity-list-container">
    <el-tabs class="tabs">
      <el-tab-pane label="正在进行">
        <div class="tabs-list">
          <template v-for="(item,i) in activityList">  
            <el-card
              class="box-card"
              v-if="nowTime > item.startTime && nowTime < item.endTime"
              :key="'now' + item.id"
            >
              <div slot="header" class="clearfix" style="display:flex;justify-content:space-between;">
                <span class="title">{{ item.title }}</span>
                <div dispa>
                  <el-button
                  style="margin-top:10px;padding:0px;"
                  type="text"
                  :data-id="item.id"
                  :data-index="i"
                  @click="showDrawerChange"
                  >{{item.regType === 'team'? '查看报名队伍' : '查看报名人员'}}</el-button
                >
                <el-button
                  style="margin:10px 0 0 20px;padding:0px;color:rgb(0, 200, 0);"
                  :data-id="item.id"
                  :data-index="i"
                  type="text"
                  size="default"
                  @click="activityEdit"
                  >编辑</el-button
                >
                
                <el-button
                  style="float: right; margin:10px 0 0 20px;padding:0px;color:#f00"
                  :data-id="item.id"
                  :data-index="i"
                  type="text"
                  size="default"
                  @click="activityDelete"
                  >删除</el-button
                >
                </div>
                
              </div>
              <div class="text item">
                <div>{{ item.desc }}</div>
                <div class="gray" v-if="item.regType === 'team'">总名额：{{ item.total / item.teamNum }}支</div>
                <div class="gray" v-else>总名额：{{ item.total }}人</div>
                <div class="gray" v-if="item.regType === 'team'">
                  剩余队伍名额：
                    <span >{{ item.total / item.teamNum  - item.teamList.length }} </span>支
                </div>
                <div class="gray" v-else>
                  剩余名额：
                    <span >{{ item.total  - item.regList.length }} </span>人
                </div>
                <div class="gray">报名截止时间：{{ item.overTime }}</div>
              </div>
            </el-card>
          </template>
          <el-empty v-if="isShowActiveList" :image-size="200"  style="margin:0 auto"></el-empty>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已结束">
        <div class="tabs-list">
          <template v-for="(item,i) in activityList">
            <el-card
              class="box-card"
              v-if="nowTime > item.endTime"
              :key="'end' + item.id"
            >
              <div slot="header" class="clearfix" style="display:flex;justify-content:space-between;">
                <span class="title">{{ item.title }}</span>
                <div>
                  <el-button
                  style="padding: 3px 0"
                  type="text"
                  @click="showDrawerChange"
                  :data-id="item.id"
                  :data-index="i"
                  >{{item.regType === 'team'? '查看报名队伍' : '查看报名人员'}}</el-button
                >
                <el-button
                  style="padding: 3px 0 3px 20px;color:#f00"
                  :data-id="item.id"
                  :data-index="i"
                  type="text"
                  size="default"
                  @click="activityDelete"
                  >删除</el-button
                >
                </div>
              </div>
              <div class="text item">
                <div>{{ item.desc }}</div>
                <div class="gray">总名额：{{ item.total }}人</div>
                <div class="gray" v-if="item.regType === 'team'">
                  参加队伍： 
                  <span>{{ item.teamList.length }} </span>支
                </div>
                <div class="gray" v-else>
                  参加人数： 
                  <span>{{ item.regList.length }} </span>人
                </div>
                <div class="gray">活动截止日期：{{ item.overTime }}</div>
              </div>
            </el-card>
           
          </template>
          <el-empty v-if="isShowOverList" :image-size="200"  style="margin:0 auto"></el-empty>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 编辑活动的抽屉 -->
    <el-drawer
      custom-class="drawer"
      :visible.sync="isShowActivityDrawer"
      direction="rtl"
      size="70%"
    >
      <h2 slot="title">修改活动信息</h2>
      <activityForm key="edit" :formData="acitvityEditForm" type="edit" @editActivitySubmit="editActivitySubmit" />
    </el-drawer>
    <!-- 单人报名的抽屉 -->
    <el-drawer
      custom-class="drawer"
      :visible.sync="isShowDrawer"
      direction="rtl"
      size="50%"
    >
      <h2 slot="title">报名人员</h2>
      <Table
        :totalData="detailList"
        @detailAdd="detailAdd"
        @detailDelete="detailDelete"
        @showEditForm="showEditForm"
        @search="onSearch"
        @getNewData="getDatabase"
      ></Table>
      <el-drawer
        append-to-body
        :visible.sync="isShowInnerDrawer1"
        direction="rtl"
        size="30%"
      >
        <h3 slot="title">修改人员信息</h3>
        <EditForm
          key="personal"
          :form="editFormData"
          :facultyOptions="FacultyOptions"
          @formSubmit="editFormSubmit"
        />
      </el-drawer>
      <el-drawer
        append-to-body
        :visible.sync="isShowInnerDrawer2"
        direction="rtl"
        size="30%"
      >
        <h3 slot="title">新增参赛人员</h3>
        <AddForm
        key="personal"
          :form="addFormData"
          :facultyOptions="FacultyOptions"
          @formSubmit="AddFormSubmit"
        />
      </el-drawer>
    </el-drawer>
    <!-- 团队报名的抽屉 -->
    <el-drawer
      custom-class="drawer"
      :visible.sync="isShowTeamDrawer"
      direction="rtl"
      size="60%"
    >
      <h2 slot="title">报名队伍</h2>
      <TeamTable
        :totalData="detailList"
        :teamNum="teamNum"
        @detailAdd="detailAdd"
        @detailDelete="detailDelete"
        @showEditForm="showEditForm"
        @search="onSearch"
        @getNewData="getDatabase"
      ></TeamTable>
      <el-drawer
        append-to-body
        :visible.sync="isShowInnerTeamDrawer1"
        direction="rtl"
        size="30%"
      >
        <h3 slot="title">修改人员信息</h3>
        <TeamEditForm
          key="team"
          :form="editFormData"
          @formSubmit="editFormSubmit"
        />
      </el-drawer>
      <el-drawer
        append-to-body
        :visible.sync="isShowInnerTeamDrawer2"
        direction="rtl"
        size="30%"
      >
        <h3 slot="title">新增参赛队伍</h3>
        <TeamAddForm
          key="team"
          :form="addFormData"
          @formSubmit="AddFormSubmit"
        />
      </el-drawer>
    </el-drawer>
  </div>
</template>

<script>
import Table from "@/components/activity/list/Table";
import TeamTable from "@/components/activity/list/TeamTable";
import EditForm from "@/components/activity/list/EditForm";
import TeamEditForm from "@/components/activity/list/TeamEditForm";
import AddForm from "@/components/activity/list/AddForm";
import activityForm from '@/components/activity/add/Form';
import TeamAddForm from "@/components/activity/list/TeamAddForm";
import {getDate} from '@/utils/index.js'
import cloudbase from "@cloudbase/js-sdk";
const app = cloudbase.init({
  env: "xzdj-8gx7xdmm79cf5415",
});
const db = app.database();
const _ = db.command;
export default {
  components: {
    Table,
    TeamTable,
    EditForm,
    TeamEditForm,
    AddForm,
    TeamAddForm,
    activityForm
  },
  data() {
    return {
      isShowActiveList:true,
      isShowOverList:true,
      activityList: [],
      acitvityEditForm:{},
      teamNum:0,
      nowTime: new Date(),
      isShowDrawer: false,
      isShowActivityDrawer:false,
      isShowTeamDrawer:false,
      isShowInnerDrawer1: false,
      isShowInnerDrawer2: false,
      isShowInnerTeamDrawer1:false,
      isShowInnerTeamDrawer2:false,
      detailList: [],
      id: "",
      editFormData: {},
      FacultyOptions: [],
      addFormData: {
        name: "",
        qq: "",
        grade: "",
        faculty: "",
        fac: [],
        id: "",
      },
    };
  },
  mounted() {
    this.getDatabase();
  },
  methods: {
    // 搜索按钮
    onSearch(data){
      this.detailList = data;
    },
    // 新增人员提交按钮
    AddFormSubmit(form) {
      console.log(form);
      let target = this.type === 'team' ? 'teamList' : 'regList';
      db.collection("community")
        .doc("activityList")
        .update({
          [`list.${this.index}.${target}`]: _.push(form),
        })
        .then((res) => {
          // 新增表单清空
          this.addFormData = {
            name: "",
            qq: "",
            grade: "",
            faculty: "",
            fac: [],
            id: "",
          },
          this.getDatabase();//获取最新数据
          
          this.$message({
            message: "新增成功",
            type: "success",
            showClose: true,
            duration: 3000,
          });
          if(this.type === 'team'){
            this.isShowInnerTeamDrawer2 = false;
            return;
          }
          this.isShowInnerDrawer2 = false;
          console.log(res);
        });
    },
    // 新增人员
    detailAdd() {
      if(this.type === 'team'){
        this.isShowInnerTeamDrawer2 = true;
        return;
      }
      this.isShowInnerDrawer2 = true;
    },
    // 删除按钮
    detailDelete(form) {
      console.log(this.id)
      const result = this.detailList.filter((item) => item.id !== form.id);
      // 数据更新
      let target = this.type === 'team' ? 'teamList' : 'regList';
      console.log(target,result)
      db.collection("community")
        .doc("activityList")
        .update({
          [`list.${this.index}.${target}`]: result,
        })
        .then((res) => {
          this.getDatabase();
          this.$message({
            message: "删除成功",
            type: "success",
            showClose: true,
            duration: 3000,
          });
          console.log(res);
        })
        .catch((res) => {
          this.$message({
            message: `删除失败,错误信息：${res}`,
            type: "error",
            showClose: true,
            duration: 3000,
          });
          if(this.type === 'team'){
            this.isShowInnerTeamDrawer2 = false;
            return;
          }
          this.isShowInnerDrawer2 = false;
        });
    },
    // 编辑表单的提交按钮
    editFormSubmit(form) {
      let i = 0;
      this.detailList.forEach((item, index) => {
        if (item.id == form.id) {
          i = index;
        }
      });
      let target = this.type === 'team' ? 'teamList' : 'regList';
      db.collection("community")
        .doc("activityList")
        .update({
          [`list.${this.index}.${target}.${i}`]: form,
        })
        .then((res) => {
          this.getDatabase();
          this.$message({
            message: "修改成功",
            type: "success",
            showClose: true,
            duration: 3000,
          });
          if(this.type === 'team'){
            this.isShowInnerTeamDrawer1 = false;
            return;
          }
          this.isShowInnerDrawer1 = false;
          console.log(res);
        });
    },
    // 编辑的内层drawer显示
    showEditForm(form) {
      if(this.type === 'team'){
        this.isShowInnerTeamDrawer1 = true;
      }else{
        this.isShowInnerDrawer1 = true;
      }
      this.editFormData = form;
    },
    // 外层drawer显示
    showDrawerChange(e) {
      console.log(e)
      // console.log(e.path[1].dataset.id);
      this.id = e.path[1].dataset.id;
      this.index = e.path[1].dataset.index;
      console.log(this.index)
      this.activityList.forEach((item,i) => {
        if(item.id == this.id){
          this.index = i;
          this.type = item.regType;
        }
      });
      this.getDatabase();
      if(this.type === 'team'){
        this.isShowTeamDrawer = true;
        return;
      }
      this.isShowDrawer = true;
      
      
    },
    // 删除活动
    activityDelete(e) {
      this.id = e.path[1].dataset.id;
      this.index = e.path[1].dataset.index;
      console.log(this.index)
      
      this.$confirm('确定要删除该活动吗？此操作不可逆！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const result = this.activityList.filter(item => item.id !== this.id);
        console.log(result)
        const updateResult = result.map(item => {
          item.startTime = getDate(item.startTime)
          item.endTime = getDate(item.endTime)
          return item
        })
        db.collection('community').doc('activityList').update({
          [`list`]:updateResult
        }).then(res =>{
          console.log(res)
          this.getDatabase();
        })
      }).catch(() => {
        
      });
    },
    // 修改活动信息
    activityEdit(e){
      console.log('修改活动信息');
      const id = e.path[1].dataset.id;
      // const index = e.path[1].dataset.index;
      const result = this.activityList.filter(item => item.id == id);
      this.acitvityEditForm = {...result[0]};
      this.isShowActivityDrawer = true;
    },
    // 修改活动页面的提交事件
    editActivitySubmit(form){
      console.log(form)
      let i = 0;
      this.detailList.forEach((item, index) => {
        if (item.id == form.id) {
          i = index;
        }
      });
      db.collection("community")
        .doc("activityList")
        .update({
          [`list.${i}`]: form,
        })
        .then((res) => {
          this.getDatabase();
          this.$message({
            message: "修改成功",
            type: "success",
            showClose: true,
            duration: 3000,
          });
          this.getDatabase();
          this.isShowActivityDrawer = false;
          console.log(res);
        });
    },
    // 获取最新数据
    getDatabase() {
      db.collection("community")
        .doc("activityList")
        .get()
        .then((res) => {
          
          if (this.isShowDrawer || this.isShowTeamDrawer) {//获取参加人员列表
            const tableResult = res.data[0].list.filter(
              (item) => item.id == this.id
            );
            console.log(tableResult);
             
            if(this.type === 'team'){
              this.detailList = tableResult[0].teamList;
              this.teamNum = tableResult[0].teamNum;
            }
            else{//获取本活动可以参加的院系
              this.FacultyOptions = tableResult[0].faculty;
              this.detailList = tableResult[0].regList.map((item) => {
                return { ...item, grade: item.fac[0], faculty: item.fac[1] };
              });
            }

          }
          console.log(res.data[0].list);
          const result = res.data[0].list.map((item) => {
            item.overTime = item.endTime;
            item.startTime = new Date(item.startTime).getTime();
            item.endTime = new Date(item.endTime).getTime();
            if(item.startTime < this.nowTime && item.endTime > this.nowTime ){
              this.isShowActiveList = false;
            }
            if(item.endTime < this.nowTime){
              this.isShowOverList = false;
            }
            return item;
          });

          console.log(result);
          this.activityList = result;
          console.log(this.activityList)
        });
    },
  },
};
</script>

<style lang="less" scoped>
.activity-list-container {
  width: 100%;
  .tabs {
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
    .tabs-list {
      display: flex;
      flex-wrap: wrap;
    }
    .empty {
      width: 400px;
      margin: 0 auto;
    }
  }
  .box-card {
    width: 450px;
    margin: 10px 20px;
    box-sizing: border-box;
    .title {
      font-size: 22px;
      font-weight: bold;
    }
    .gray {
      font-size: 14px;
      color: #999;
      margin: 5px 0;
      span {
        color: #f00;
        font-weight: bold;
      }
    }
  }
  .drawer {
    .btn {
      margin: 10px 0px 10px 20px;
    }
  }
  #el-drawer__title.el-drawer__header {
    margin-bottom: 0 !important;
  }
}
</style>
<style lang="less">
.activity-list-container {
  #el-drawer__title.el-drawer__header {
    margin-bottom: 0 !important;
  }
}
</style>