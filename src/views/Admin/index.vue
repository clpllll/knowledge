<template>
  <div class="admin">
    <div class="content">
    <h1>后台管理</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        ruleForm:{name:'',password:""},
        rules:{
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, message: '长度大于3 个字符', trigger: 'blur' }
          ],
         password:[ 
           { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }]
        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped lang="less">
.admin{
  border-top:1px solid transparent; 
   padding-top:100px; 

 .content{
   h1{
     text-align: center;
   } 
   width: 400px;
   margin: 0 auto;
   padding: 10px 20px 30px 20px;
   border-radius: 10px;
   box-shadow: 1px 1px 5px 5px #ccc;
 }
}
</style>

