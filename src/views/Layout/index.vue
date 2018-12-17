
<template>
  <div class="layout">
    <NavBar/>
    <div class="content">
      <Sidebar/>
      <div class="main">
        <!-- layout -->
        <router-view></router-view>
      </div>
    </div>
  </div>
  
</template>

<script>
import NavBar from './NavBar.vue'
import Sidebar from './Sidebar.vue'
export default {
 data(){
   return{

   }
 },
 components:{
   NavBar,
   Sidebar
 }
}
</script>

<style scoped lang="less">

  .layout{
    width: 100%;
    height: 100%;
    .content{
      height: calc(100% - 50px);
      display: flex;
      .main{
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }
</style>

