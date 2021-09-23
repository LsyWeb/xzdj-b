<template>
  <div class="edit-form-container">
   <Form :form="formData" @formSubmit="formSubmit" />
  </div>
</template>

<script>
import Form from './Form'
  export default {
    props:{
      formData:Object
    },
    components:{
      Form
    },
    methods:{
      formSubmit(form){
        this.$emit('formSubmit',form)
      }
    }
  }
</script>

<style lang="less" scoped>
.edit-form-container{
 text-align: center; 
}
</style>