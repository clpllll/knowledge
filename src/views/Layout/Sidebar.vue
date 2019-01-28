<template>
  <div class="sidebar">
    <el-tree 
    :data="dataList" 
    :props="defaultProps" 
    node-key="title"
    :highlight-current="true"
    :accordion="true"
    :default-expanded-keys="defaultKey"
    @node-click="handleNodeClick"
    @node-expand="aa"
    ref="treeBox"
>
    </el-tree>
  </div>
</template>
<script>
import { getCategory } from '@/api/layout';
  export default {
    data(){
      return{
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        data:{},
        defaultKey:['js'],
      };
    },
    mounted() {
      let { path, hash } = this.$route;
      path = path.replace('/','')
      hash = hash?decodeURIComponent(this.$route.hash).replace('#',''):null;
      this.defaultKey = [path];
      this.getList()
      this.$nextTick(() => {
        this.$refs.treeBox.setCurrentKey(hash); 
        // treeBox 元素的ref   value 绑定的node-key
      });
    },
    computed:{
      dataList(){
        return Object.keys(this.data).map(key=>{ 
          return {title:key,children:this.data[key]}; 
         } )
      }
    },
    methods:{
      handleNodeClick(data,node) {
        const parent = node.parent.data.title;
        const title = data.title;
        // console.log(parent,title);
        this.$router.push(parent?parent+'#'+title:title)
      },
      getList(){
        getCategory().then(res=>{
          // console.log('get',res)
          this.data = res.data;
        })
      },
      aa(){
        console.log('click')
      }
    }
  }
</script> 
<style scpoed lang="less">
  .sidebar{
    left: 0;
    width: 200px;
    border-right:1px solid #ccc;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
  }
</style>

