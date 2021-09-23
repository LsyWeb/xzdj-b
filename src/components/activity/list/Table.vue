<template>
  <div class="table-container">
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
        <el-button
          v-if="searchBackShow"
          type="info"
          size="small"
          @click="searchBack"
          >返回</el-button
        >
      </div>
      <div class="right">
        <el-button type="primary" size="small" @click="detailAdd"
          >新增人员</el-button
        >
      </div>
    </div>
    <div class="table" ref="table"  v-loading="isLoading">
      <el-table :data="data" border highlight-current-row stripe>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="grade"
          label="年级"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="faculty"
          label="院系"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="class"
          label="班级"
          align="center"
        ></el-table-column>
        <el-table-column prop="qq" label="qq" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
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

    <el-pagination
      class="pager"
      background
      layout="total , prev, pager, next"
      :page-size="20"
      :total="totalData.length"
      :current-page.sync="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    totalData: Array,
    toPage: String,
  },
  data() {
    return {
      isLoading: false,
      searchValue: "",
      searchBackShow: false,
      currentPage: 1,
    };
  },
  computed: {
    data() {
      return this.totalData.filter((item, i) => {
        return i >= (this.currentPage - 1) * 20 && i < this.currentPage * 20;
      });
    },
  },
  watch: {
    currentPage() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
      this.$refs.table.scrollTop = 0;
    },
    searchValue() {
      if (this.searchValue == "") {
        this.searchBackShow = false;
        this.$emit('getNewData')
      }
    },
  },
  methods: {
    // 删除按钮
    handleDelete(index,row){
      this.$confirm(`是否删除名字为${row.name}的成员？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('detailDelete',row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 编辑按钮
    handleEdit(index, row) {
      console.log(index, row);
      const editFormData = { ...row }; //使用{...}展开的原因是因为，row是响应式对象，直接赋值会导致页面表单数据和row绑定
      this.$emit('showEditForm',editFormData)
    },
    // 搜索返回
    searchBack() {
      this.searchBackShow = false;
      this.searchValue = "";
      this.$emit('getNewData')
    },
    // 搜索按钮
    searchSubmit() {
      this.searchBackShow = true;
      const searchData = this.totalData.filter((item) => {
        // Object.values(item).indexOf(this.searchValue) > 0
        const res = Object.values(item).filter((i) => {
          return i.toString().indexOf(this.searchValue) >= 0;
        });
        return res.length > 0;
      });
      this.$emit('search',searchData)
      // if (this.totalData.length == 0) {
      //   this.isLoading = false;
      // }

      // console.log(this.totalData)
    },
    // 新增活动人员
    detailAdd() {
      this.$emit('detailAdd')
    },
  },
};
</script>

<style lang="less" scoped>
.table-container {
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
  .table {
    height: 60vh;
    overflow: auto;
  }
  .pager {
    margin: 20px;
    text-align: right;
  }
}
</style>