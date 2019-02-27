<template>
  <header class="navbar">
    <div class="logo">InterviewMap</div>
    <nav>
      <div class="search">
        <svg-icon iconName="search" v-if="!flagSearch" @click="changeSearch"/>
        <el-select
          v-else
          size="small"
          @change="select"
          v-model="search"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in searchOptions"
            :key="item._id"
            :label="item.type+' -> '+item.title"
            :value="[item.category,item.title,item.type]">
          </el-option>
        </el-select>
      </div>
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
import { getGeneralities } from '@/api/layout';
import { getSearch } from '@/api/search';
  export default {
    data(){
      return{
        navList:[],
        flagSearch:false,
        search:'',
        searchOptions:[],
        loading:false,
      }
    },
    beforeMount(){
      getGeneralities().then(res=>{
        // console.log('getGeneralities',res)
        this.navList = res?res.data:[];
      })
    },
    methods:{
      handleClick(data){
        this.$router.push({ path: '/'+data })
      },
      changeSearch(){
        this.flagSearch=true;
      },
      remoteMethod(query) {
        // console.log('query',query)
        if(!query)return
        this.loading=true;
        getSearch({key:query}).then(res=>{
          // console.log('search',res.data)
          this.loading = false;
          this.searchOptions = res?res.data:[]; 
        })
      },
      select(){
        const [category,title,type] = this.search
        this.$router.push({ path: `/${type}/${category}#${title}`})
        this.search = "";
        this.flagSearch=false;
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
        cursor: pointer;
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
        .icon{
          font-size: 20px;
          color:#ccc;
        }
      }
    }
  }
</style>

