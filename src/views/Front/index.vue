<template>
  <div class="knowledge"  v-loading.fullscreen="loading">
    <transition name="fade" mode="out-in">
    </transition>
    <div  v-for="item in list" :key="item._id" class="item">
      <a :href="'#'+item.name" :id="setId(item.name)"> {{item.name}}
        <span v-show="flagToken">
          <i class="el-icon-edit" @click="(event)=>edit(event,item)"></i>
          <i class="el-icon-delete" @click="(event)=>del(event,item._id)"></i>
        </span>
      </a>
      <p v-html="item.content" v-highlight> </p>
    </div>
    <el-dialog
      title="update"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
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
    <el-dialog
      title="提示"
      :visible.sync="reloadLogin"
      width="50%">
      <span>已登出，重新登录</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reloadLogin = false">取 消</el-button>
        <el-button type="primary" @click="toAdmin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Nav from '../Navbar'
import { getArticle, patchArticle } from '@/api/layout.js'
import { getToken }from '@/util/token.js';
import { mapMutations, mapState } from 'vuex'
const Showdown = require('showdown')
  export default {
    data(){
      return{
        main:null,
        list:[],
        dialogVisible:false,
        reloadLogin:false,
        updateObj:{},
        type:"",
        MarkDown:null,
        loading:false,
      }
    },
    beforeMount(){
      const { path } = this.$route;
      this.type = path.split('/')[2]
      this.getList()
      this.MarkDown = new Showdown.Converter({
        disableForced4SpacesIndentedSublists:true,
        tables: true,
        strikethrough: true
        })
            // disableForced4SpacesIndentedSublists:true
      // this.MarkDown.setFlavor('github');
      // console.log(this.MarkDown.getOptions())
    },
    
    mounted(){
      this.main = document.querySelector('.main');
      const id = this.$route.hash;
      if(id) this.$nextTick(()=>{
        setTimeout(()=>{
          this.goAnchor(this.setId(decodeURIComponent(id)))
          },0)
        })
    },
    computed:mapState(['flagToken']),
    watch:{
      $route(to,from) {
        if(to.hash) {
          if(to.path===from.path){
            const id = this.setId(decodeURIComponent(to.hash))
            this.goAnchor(id)
          }else{
            const { path } = this.$route;
            this.type = path.split('/')[2];
            this.getList(()=>{
              const id = this.setId(decodeURIComponent(to.hash))
              this.goAnchor(id)
            })
          }
        }else {
          const { path } = this.$route;
          this.type = path.split('/')[2];
          this.getList()
          this.main.scrollTop = 0;
        }
      },
      dialogVisible(a,b){
        console.log('dialogVisible',a,b)
      }
    },
    methods:{
      // ...mapMutations([
      //   'remove_token',
      // ]),
      getList(callback){
        const { type } = this;
        this.loading= true;
        getArticle({type}).then(res=>{
          // console.log('getArticle',res)
          this.loading = false;
          this.list = res?res.data:[];
          callback&&setTimeout(()=>{
            callback()
          },0)
        })
      },
      edit(e,item){
        e.stopPropagation()
        e.preventDefault()
        // this.remove_token(new Date().getTime())
        console.log(this.flagToken)
        if(!this.flagToken) {
          this.reloadLogin = true;
          return;
        }
        this.dialogVisible = true;
        this.updateObj.name = this.MarkDown.makeMarkdown(item.name);
        this.updateObj.content = this.MarkDown.makeMarkdown(item.content);
        this.updateObj._id = item._id;
      },
      del(e,id){
        e.stopPropagation()
        e.preventDefault()
        // console.log(id)
      },
      goAnchor(selector) {
        const anchor = document.querySelector(selector)
        this.main.scrollTop = anchor.offsetTop - 60;
      },
      setId(str){
        return str.replace(/,|\.|\+|!|=|\s+/g,'')
      },
      update(item){
        const obj = Object.assign({},item);
        obj.content = this.MarkDown.makeHtml(item.content);
        obj.type = this.type;
        patchArticle(obj).then(res=>{
            this.dialogVisible = false;
            if(res)this.getList();
        })
      },
      toAdmin(){
        this.$router.push({path:'/admin'});
        this.reloadLogin = false;
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
