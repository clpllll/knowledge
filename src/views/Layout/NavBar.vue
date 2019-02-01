<template>
  <header class="navbar">
    <div class="logo">InterviewMap</div>
    <nav>
      <div class="search"><input type="text"></div>
      <ul>
        <li v-for="item in navList" 
        :key="item.value"  @click="handleClick(item.value)">
          {{item.label}}
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import {getGeneralities} from '../../api/layout';
  export default {
    data(){
      return{
        navList:[]
      }
    },
    beforeMount(){
      getGeneralities().then(res=>{
        console.log('getGeneralities',res)
        this.navList = res?res.data:[];
      })
    },
    methods:{
      handleClick(data){
        this.$router.push({ path: '/'+data })
      }
    }
  }
</script>
<style lang="less" scoped>
  .navbar{
    height: 50px;
    background-color: #ffd54f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    nav{
      display: inherit;
      justify-content: inherit;
      align-items: center;
      ul{
        li{
          float: left;
          cursor: pointer;
          border-bottom:2px solid transparent;
          &:hover{
            border-bottom:2px solid #fff;
          }
        }
        li~li{
          margin-left: 20px;
        }
      }
      .search{
        margin-right:30px;
        input{
          height: 25px;
          border-radius:13px;
          border:1px solid #ccc;
          padding:0 20px;
          &:focus{
            outline: none;
          }
        }
      }
    }
  }
</style>

