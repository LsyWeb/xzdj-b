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
          >新增队伍</el-button
        >
      </div>
    </div>
    <div class="table" ref="table"  v-loading="isLoading">
      <el-table :data="data" border highlight-current-row stripe>

        <el-table-column v-for="(item, index) in tableList" :key="index"
          :prop="item.value"
          :label="item.label"
          align="center"
        ></el-table-column>
        
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
    teamNum:Number,
  },
  data() {
    return {
      isLoading: false,
      searchValue: "",
      searchBackShow: false,
      currentPage: 1,
      tableList:[
        {
          value:'captain',
          label:'队长'
        },
        {
          value:'teamNumber1',
          label:'队员1'
        },
        {
          value:'teamNumber2',
          label:'队员2'
        },
        {
          value:'teamNumber3',
          label:'队员3'
        },
        {
          value:'teamNumber4',
          label:'队员4'
        },
        {
          value:'qq',
          label:'队长联系qq'
        }
      ]
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
    // 监听页码变化
    currentPage() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
      this.$refs.table.scrollTop = 0;
    },
    // 监听搜索框变化
    searchValue() {
      if (this.searchValue == "") {
        this.searchBackShow = false;
        this.$emit('getNewData')
      }
    },
    // 监听团队人数变化
    teamNum(){
      let res = []
      for(let i = 0; i < this.teamNum - 1; i++){
        res.push({
          value:`teamNumber${i+1}`,
          label:`队员${i+1}`
        })
      }
       this.tableList = [
          { 
            value:'captain',
            label:'队长'
          },
          ...res,
          {
            value:'qq',
            label:'队长联系qq'
          }
        ]
      console.log(this.teamNum,this.tableList)
    }
  },
  methods: {
    // 删除按钮
    handleDelete(index,row){
      this.$confirm(`是否删除队长为${row.captain}的成员？`, '提示', {
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