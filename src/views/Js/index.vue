<template>
  <div>js
    <template v-for="item in list">
      <a v-for="(value,key) in item" v-anchor :key="key" href="javascript:;">
        {{value}}
        </a>
      
    </template>
  </div>
</template>
<script>
import data from './data.js'
  export default {
    data(){
      return{
        list:data
      }
    },
    computed:{
      listData(){
        console.log(this.list)
        return
      }
    },
    method:{

    }
  }
</script>
<style scoped lang="less">
  a{
    display: block;
    color:#000;
    height: 400px;
    &:hover{
      color:#000;
    }
  }
</style>
