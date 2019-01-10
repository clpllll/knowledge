<template>
  <div class="admin">
    <h1>添加文章</h1>
    <div class="backIndex">
      <router-link to="/js">返回首页</router-link>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章类别" prop="type">
        <el-radio v-model="ruleForm.type" label="js">js</el-radio>
        <el-radio v-model="ruleForm.type" label="browser">浏览器</el-radio>
        <el-radio v-model="ruleForm.type" label="performance">性能</el-radio>
      </el-form-item>
      <el-form-item label="文章名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <el-input type="textarea" :autosize="{minRows: 4}" @blur="changeContent" v-model="ruleForm.content"></el-input>
      </el-form-item>
        <div class="content">
          <!-- <div class="title">展示</div> -->
          <div class="box" v-html="content" v-highlight></div>
        </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { setArticle } from '@/api/layout.js'
  const Showdown = require('showdown')
  export default {
    data(){
      return{
      MarkDown:null,
      content:"",
      ruleForm: {
          name: '',
          type: [],
          content: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择一个活动性质', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    beforeMount(){
      this.MarkDown = new Showdown.Converter({tables: true, strikethrough: true})
      // this.MarkDown.setFlavor('github');
      console.log(this.MarkDown.getOptions())
      // this.MarkDown.setOption('tables', true);
      // console.log(this.MarkDown.getOption('tables'))
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const obj = Object.assign({},this.ruleForm);
            obj.content = this.content;
            setArticle(obj).then(res=>{
              // console.log('add',res)
              if(res.data.code===200) this.$router.push('/js')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      changeContent(){
        
        console.log(this.MarkDown.makeHtml(this.ruleForm.content))
        this.content = this.MarkDown.makeHtml(this.ruleForm.content)
      }
    }
  }
</script>
<style scoped lang="less">
  .admin{
    width: 100%;
    height: 100%;
    position: relative;
    h1{
      text-align: center;
    }
    .backIndex{
      position: absolute;
      right: 10px;
      top: -5px;
      font-size: 12px;
      color:orange;
      cursor: pointer;
    }
    form{
      width: 70%;
      margin: 50px auto 0;
      .el-textarea{
        width: 100%;
        vertical-align: top;
      }
      .content{
        // display: inline-block;
        width: 100%;
        height: 100%;
        vertical-align: top;
        border: 1px solid #ccc;
        box-sizing: border-box;
        min-height: 54px;
        .title{
          text-align: center;
          height: 30px;
        }
        .box{
          line-height: 18px;
          padding:0 10px;
        }
      }
    }
  }
</style>



