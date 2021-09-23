<template>
  <div class="message-list-container">
    <Table
        :totalData="messageList"
        @detailDelete="messageDelete"
        @search="onSearch"
        @getNewData="getMessageList"
      ></Table>
  </div>
</template>

<script>
import Table from '@/components/message/Table'
import { getTime } from '@/utils/index.js'
import cloudbase from "@cloudbase/js-sdk";
const app = cloudbase.init({
  env: "xzdj-8gx7xdmm79cf5415",
});
const db = app.database();
// const _ = db.command;

  export default {
    components:{
      Table
    },
    data(){
      return{
        messageList:[]
      }
    },
    methods:{
      // 获取最新数据
      // 搜索
      onSearch(data){
        console.log(data)
        this.messageList = data;
      },
      // 删除某条评论
      messageDelete(row){
        console.log(row)
        db.collection('message').doc('messageList').get().then(res => {
          console.log(res)
          let result = res.data[0].list.filter(item => row.oldTime !== item.time )
          console.log(result)
          if(row.children.length === 0){
            result = res.data[0].list.map(item =>{
              item.children = item.children.filter(it => row.oldTime !== it.time)
              return item;
            })
          }
          db.collection('message').doc('messageList').update({
            'list':result
          }).then(() =>{
            this.$message({
              message: '删除成功',
              type: 'success',
              showClose: true,
              duration: 3000,
            });
            
            this.getMessageList();
          })
        })
      },
      // 获取最新留言数据
      getMessageList(){
        db.collection('message').doc('messageList').get().then(res => {
            console.log(res)
            const result = res.data[0].list.map(item => {
                item.oldTime = item.time;
                item.time = getTime(item.time) 
                item.children = item.children.map(it=>{
                  it.oldTime = it.time;
                  it.time = getTime(it.time);
                  return it;
                })
                return item;
            })
            console.log(result)
            this.messageList = result;
        })
      }
    },
    mounted(){
      this.getMessageList();
    }
  }
</script>

<style lang="less" scoped>

</style>