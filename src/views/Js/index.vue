<template>
  <div class="knowledge">
    <transition name="fade" mode="out-in">
      <!-- <Nav/> -->
    </transition>
    <div  v-for="item in list" :key="item._id">
      <h3  v-anchor >{{item.name}}</h3>
      <p   v-html="item.content"> </p>
    </div>
  </div>
</template>
<script>
import Nav from '../Navbar'
import { getArticle } from '@/api/layout.js'
  export default {
    data(){
      return{
        list:[]
      }
    },
    mounted(){
      this.getList()
    },
    computed:{
    },
    filters:{
      ff:(value)=>{
        console.log("value")
        return value
      }
    },
    methods:{
      getList(){
        getArticle({type:"js"}).then(res=>{
          console.log('getArticle',res)
          this.list = res.data;
        })
      }
    },
    components:{
      Nav
    }
  }
</script>
<style scoped lang="less">
.knowledge{
  padding:10px 1.5rem;
  h3{
    cursor: pointer;
    padding-bottom:5px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 13px;
    margin-top:20px; 
  }
  p{
    color:#000;
    &:hover{
      color:#000;
    }
  }
}

</style>
