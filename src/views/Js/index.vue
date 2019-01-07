<template>
  <div class="knowledge">
    <transition name="fade" mode="out-in">
      <!-- <Nav/> -->
    </transition>
    <div  v-for="item in list" :key="item._id"  class="item">
      <h3  v-anchor > {{item.name}}
        <span v-show="token">
          <i class="el-icon-edit" @click="(event)=>edit(event,item)"></i>
          <i class="el-icon-delete" @click="(event)=>del(event,item._id)"></i>
        </span>

      </h3>
      <p   v-html="item.content"> </p>
    </div>
    <el-dialog
      title="update"
      :visible.sync="dialogVisible"
      width="70%">
      <div v-html="updateObj.content"> </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Nav from '../Navbar'
import { getArticle } from '@/api/layout.js'
import { getToken }from '@/util/token.js';
const Showdown = require('showdown')
  export default {
    data(){
      return{
        list:[],
        dialogVisible:false,
        token:false,
        updateObj:{},
      }
    },
    beforeMount(){
      // console.log(getToken())
    },
    
    mounted(){
      this.token = !!getToken();
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
      },
      edit(e,item){
        e.stopPropagation()
        e.preventDefault()
        this.dialogVisible = true;
        console.log(item.name)
        this.updateObj = item;
      },
      del(e,id){
        e.stopPropagation()
        e.preventDefault()
        console.log(id)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
  .item{
    // position: relative;
    span{
      // position: absolute;
      // right: 10px;
      // top: 0;
      i{
        cursor: pointer;
        margin-left: 10px;
        color:blue;
      }
    }
  }
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
