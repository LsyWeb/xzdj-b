<template>
  <div class="club-list-container">
    <div class="search">
      <div class="left">
        <el-input
          class="searchInput"
          v-model="searchValue"
          placeholder="输入关键字搜索"
          size="normal"
          clearable
        ></el-input>
        <el-button
          class="searchBtn"
          type="primary"
          size="small"
          icon="el-icon-search"
          @click="searchSubmit"
          >搜索</el-button
        >
        <el-button v-if="searchBackShow" type="info" size="small" @click="searchBack">返回</el-button>
        
      </div>
      <div class="right">
        <el-button type="primary" size="small" @click="toClubAddPage"
          >新增社员</el-button
        >
      </div>
    </div>
    <div class="club-table" ref="table" v-loading="tableData.length == 0 && isLoading">
      <el-table :data="tableData" highlight-current-row stripe border>
        <el-table-column
          v-for="col in columns"
          :prop="col.id"
          :key="col.id"
          :label="col.label"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pager">
      <el-pagination
        background
        layout=" total , prev, pager, next"
        :page-size="20"
        :total="totalData.length"
        :current-page.sync="currentPage"
        :current-change="currentChange"
      >
      </el-pagination>
    </div>
    <el-dialog title="编辑" center :visible.sync="dialogVisible" width="30%">
      <EditForm :formData="editFormData" @formSubmit="editFormSubmit" />
    </el-dialog>
  </div>
</template>

<script>
import cloudbase from "@cloudbase/js-sdk";
import EditForm from "@/components/club/EditForm";
const app = cloudbase.init({
  env: "xzdj-8gx7xdmm79cf5415",
});
const db = app.database();
export default {
  components: {
    EditForm,
  },
  data() {
    return {
      isLoading:true,
      searchValue: "",
      searchBackShow:false,
      columns: [
        {
          label: "姓名",
          id: "name",
        },
        {
          label: "年级",
          id: "grade",
        },
        {
          label: "院系",
          id: "faculty",
        },
        {
          label: "班级",
          id: "class",
        },
        {
          label: "手机号",
          id: "mobile",
        },
      ],
      totalData: [],
      currentPage: 1,
      dialogVisible: false,
      editFormData: [],
    };
  },
  computed: {
    tableData() {
      return this.totalData.filter((item, i) => {
        return i >= (this.currentPage - 1) * 20 && i < this.currentPage * 20;
      });
    },
  },
  watch: {
    // 监控currentPage 变化
    currentPage() {
      // console.log(this.$refs.table)
      this.$refs.table.scrollTop = 0;
    },
    searchValue(){
      if(this.searchValue == ''){
        this.isLoading = true;
        this.getDatabase();
      }
    }
  },
  methods: {
    searchBack(){
      this.searchBackShow = false;
      this.searchValue = '';
      this.isLoading = true;
      this.getDatabase();
    },
    // 搜索按钮
    searchSubmit() {
      this.searchBackShow = true;
      this.totalData = this.totalData.filter((item) => {
        // Object.values(item).indexOf(this.searchValue) > 0
        const res = Object.values(item).filter((i) => {
          return i.indexOf(this.searchValue) >= 0;
        });
        return res.length > 0
      });
      if(this.totalData.length == 0){
        this.isLoading = false;
      }
      
      // console.log(this.totalData)
    },
    // 删除按钮
    async handleDelete(index, row) {
      console.log(index, row);
      // const id = row.id;
      this.$confirm(`是否删除姓名为${row.name}的学生？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.totalData = this.totalData.filter((item) => item.id !== row.id);
          console.log(this.totalData);
          // 更新数据库中的数据
          this.updateDatabase();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑页面的提交按钮
    editFormSubmit(form) {
      this.dialogVisible = false;
      console.log(form);
      this.totalData = this.totalData.map((item) => {
        if (item.id === form.id) {
          item = form;
        }
        return item;
      });
      this.updateDatabase();
    },
    // 编辑按钮
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogVisible = true;
      this.editFormData = { ...row }; //使用{...}展开的原因是因为，row是响应式对象，直接赋值会导致页面表单数据和row绑定
    },
    // 跳转新增页面
    toClubAddPage() {
      this.$router.push({ name: "ClubAdd" });
    },
    // 当前页数改变
    currentChange(page) {
      console.log(this.currentPage);

      this.currentPage = page;
    },
    // 更新数据库社团人员数据
    updateDatabase() {
      db.collection("community")
        .doc("clubList")
        .update({
          data: this.totalData,
        })
        .then((res) => {
          console.log(res);
        });
    },
    // 从数据库获取最新数据并渲染页面
    getDatabase() {
      db.collection("community")
        .doc("clubList")
        .get()
        .then((res) => {
          const result = res.data[0].data;
          console.log(result)
          const _totalData = result.map(item =>{
            item.grade = item.fac[0];
            item.faculty = item.fac[1];
            return item;
          })
          this.totalData = _totalData;
          console.log(_totalData)
        });
    },
  },

  async mounted() {
    // 获取数据库中的数据
    this.getDatabase();
  },
};
</script>

<style lang="less" scoped>
.club-list-container {
  .search {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .searchInput {
      width: 250px !important;
      margin-right: 20px;
    }
  }
  .club-table {
    // height: 70vh;
    overflow: auto;
  }
  .pager {
    text-align: right;
    margin: 10px 20px;
  }
}
</style>