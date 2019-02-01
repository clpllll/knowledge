<template>
  <div class="admin">
    <h1>添加文章</h1>
    <div class="backIndex">
      <router-link to="/js">返回首页</router-link>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="文章总类" prop="category">
        <el-radio v-for="val in Object.values(navList)"
          :key="val.value"
          v-model="ruleForm.category"
          :label="val.value">
          {{val.label}}
        </el-radio>
      </el-form-item>
      <el-form-item label="文章类别" prop="type">
        <el-radio v-for="val in categoryList"
          :key="val.value"
          v-model="ruleForm.type"
          :label="val.value">
          {{val.label}}
        </el-radio>
      </el-form-item>
      <el-form-item label="文章名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <div class="importimg">
        <svg-icon iconName="img" @click="impotImage"></svg-icon>
        <!-- <input type="file" ref="img" class="img" :value="image"/> -->
        <el-upload
          class="upload-demo"
          action="/api/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :show-file-list="false"
          :on-success="handleUpload"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <el-form-item label="文章内容" prop="content">
        <el-input
          type="textarea"
          :autosize="{minRows: 4}"
          @blur="changeContent"
          v-model="ruleForm.content"
        ></el-input>
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
import { setArticle, getGeneralities } from "@/api/layout.js";
const Showdown = require("showdown");
export default {
  data() {
    return {
      MarkDown: null,
      content: "",
      image: "",
      fileList: [],
      navList:[],
      ruleForm: {
        name: "",
        type: [],
        content: ""
      },
      rules: {
        category: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择一个活动性质", trigger: "change" }
        ],
        content: [
          { required: true, message: "请填写活动形式", trigger: "blur" }
        ]
      },
      front:[
        {value:"js",label:"js"},
        {value:"browser",label:"浏览器"},
        {value:"performance",label:"性能"}
      ],
      serve:[
        {"value":"koa","label":"koa"},
      ],
      src:''
    };
  },
  beforeMount() {
    this.MarkDown = new Showdown.Converter({
      tables: true,
      strikethrough: true
    });
    this.getGeneralities()
    // console.log(this.MarkDown.getOptions());
  },
  computed:{
    categoryList(){
      // console.log( this.ruleForm.category)
      const category = this.ruleForm.category;
      return category?this.navList[category].children||[]:[]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj = Object.assign({}, this.ruleForm);
          obj.content = this.content;
          setArticle(obj).then(res => {
            console.log('add',res)
            res&&this.$router.push(`/${this.ruleForm.category}`);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getGeneralities(){
      getGeneralities().then(res=>{
        console.log('getGeneralities',res)
        this.navList = res?res.data:{};
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeContent() {
      // console.log(this.MarkDown.makeHtml(this.ruleForm.content));
      this.content = this.MarkDown.makeHtml(this.ruleForm.content);
    },
    impotImage() {

    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleUpload(response){
      if(response.code===200){
        this.ruleForm.content = `${this.ruleForm.content}![](http://localhost:8080/api${response.data.path})`;
      }
    }
  }
};
</script>
<style scoped lang="less">
.admin {
  width: 100%;
  height: 100%;
  position: relative;
  h1 {
    text-align: center;
  }
  .backIndex {
    position: absolute;
    right: 10px;
    top: -5px;
    font-size: 12px;
    color: orange;
    cursor: pointer;
  }
  form {
    width: 70%;
    margin: 50px auto 0;
    .importimg {
      margin-left: 100px;
      font-size: 20px;
      position: relative;
      svg {
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
        cursor: pointer;
      }
      .upload-demo{
        width: 20px;
        height: 20px;
        overflow: hidden;
        opacity: 0;
      }
    }
    .el-textarea {
      width: 100%;
      vertical-align: top;
    }
    .content {
      // display: inline-block;
      width: 100%;
      height: 100%;
      vertical-align: top;
      border: 1px solid #ccc;
      box-sizing: border-box;
      min-height: 54px;
      .title {
        text-align: center;
        height: 30px;
      }
      .box {
        line-height: 18px;
        padding: 0 10px;
      }
    }
  }
}
</style>



