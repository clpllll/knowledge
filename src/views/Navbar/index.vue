<template>
  <div class="nav">
    <span v-for="item in list" :key="item._id">{{item.title}}</span>
  </div>
</template>
<script>
  import { getTitle } from '@/api/layout'
  export default {
    data(){
      return{
        list:[]
      }
    },
    beforeMount(){
      this.getList()
    },
    methods:{
      getList(){
        getTitle().then(res=> this.list = res?res.data:[])
      }
    }
  }
</script>
<style scoped lang="less">
.nav{
  width: 80px;
  position: fixed;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 3px;
  background-color: #ffd54f;
  padding:5px;
  border:1px solid #ffd54f;
  &::before{
    display: block;
    content: ">";
    background-color: #eee;
    position: absolute;
    top:-22px;
    left: 0px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  span{
    display: block;
    word-break: break-all;
    margin:10px 0 ;
    cursor: pointer;
  }
}
</style>
