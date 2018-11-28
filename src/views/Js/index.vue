<template>
  <div>js
    <template v-for="(item,count) in list">
      <h3 :key="count" v-anchor >{{Object.keys(item)[0]}}</h3>
      <p v-for="(value,key) in item" :key="key" href="javascript:;">
        {{value}}
        </p>
      
      
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
h3{
  cursor: pointer;
}
  p{
    // display: block;
    color:#000;
    height: 400px;
    &:hover{
      color:#000;
    }
  }
</style>
