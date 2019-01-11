<template>
  <div class="knowledge">
    <transition name="fade" mode="out-in">
    </transition>
    <div  v-for="item in list" :key="item._id"  class="item">
      <a :href="'#'+item.name" :id="setId(item.name)"> {{item.name}}
        <span v-show="token">
          <i class="el-icon-edit" @click="(event)=>edit(event,item)"></i>
          <i class="el-icon-delete" @click="(event)=>del(event,item._id)"></i>
        </span>
      </a>
      <!-- <svg-icon iconName="copy"></svg-icon> -->
      <p v-html="item.content" v-highlight> </p>
    </div>
    <el-dialog
      title="update"
      :visible.sync="dialogVisible"
      width="70%">
      <el-input v-model="updateObj.name" placeholder="请输入内容"></el-input>
      <el-input
        type="textarea"
        :rows="11"
        placeholder="请输入内容"
        v-model="updateObj.content">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update(updateObj)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Nav from '../Navbar'
import { getArticle, patchArticle } from '@/api/layout.js'
import { getToken }from '@/util/token.js';
const Showdown = require('showdown')
  export default {
    data(){
      return{
        main:null,
        list:[],
        dialogVisible:false,
        token:false,
        updateObj:{},
        type:"",
        MarkDown:null,
      }
    },
    beforeMount(){
      const { path } = this.$route;
      this.type = path.replace('/','')
      this.getList()
      this.MarkDown = new Showdown.Converter()
    },
    
    mounted(){
      this.token = !!getToken();
      this.main = document.querySelector('.main');
    },
    computed:{
    },
    watch:{
      $route(to,from) {
        if(to.hash) {
          const id = this.setId(decodeURIComponent(to.hash))
          this.goAnchor(id)
        }else {
          console.log(to)
          const { path } = this.$route;
          this.type = path.replace('/','')
          this.getList()
          this.main.scrollTop = 0;
        }
      }
    },
    filters:{
      // ff:(value)=>{
      //   console.log("value")
      //   return value
      // }
    },
    methods:{
      getList(){
        const { type } = this;
        getArticle({type}).then(res=>{
          console.log('getArticle',res)
          if(res.code===200){
            this.list = res.data;
          }
        })
      },
      edit(e,item){
        e.stopPropagation()
        e.preventDefault()
        this.dialogVisible = true;
        // console.log(item)
        this.updateObj.name = this.MarkDown.makeMarkdown(item.name);
        this.updateObj.content = this.MarkDown.makeMarkdown(item.content);
        this.updateObj._id = item._id;
      },
      del(e,id){
        e.stopPropagation()
        e.preventDefault()
        console.log(id)
      },
      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // },
      goAnchor(selector) {
        const anchor = document.querySelector(selector)
        this.main.scrollTop = anchor.offsetTop - 50;
      },
      setId(str){
        return str.replace(/,|\.|\+|!|=|\s+/g,'')
      },
      update(item){
        const obj = Object.assign({},item);
        obj.content = this.MarkDown.makeHtml(item.content);
        obj.type = this.type;
        console.log(obj)
        patchArticle(obj).then(res=>{
          console.log('put',res)
        })
        // this.dialogVisible = false;
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
    margin-bottom: 50px;
    >a{
      font-size: 22px;
      color:#000;
      font-weight: 700;
    }
    span{
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
