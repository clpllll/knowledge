<template>
  <div class="admin">
    <div v-if="type==='login'" class="content">
      <h1>后台管理</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm','login')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <!-- <el-button @click="changeFrom('register','ruleForm')">注册</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="register">
      <h1>用户注册</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" v-model="ruleForm.password2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm1','register')">提交</el-button>
          <el-button @click="resetForm('ruleForm1')">重置</el-button>
          <el-button @click="changeFrom('login','ruleForm1')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login, register, getInfo } from "@/api/login.js";
import encrypt from "./encrypt.js";
import { setToken, getToken } from '@/util/token';
import { mapMutations } from 'vuex'
export default {
  data() {
    const validatorP = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      type: "login",
      ruleForm: { name: "", password: "", password2: "" },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "长度大于3 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password2: [{ validator: validatorP, trigger: "blur" }]
      },
      path:''
    };
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      vm.setPath(from.path)
    })
  },
  beforeMount(){
    if(getToken()) this.$router.push({path:'/'})
  },
  methods: {     
    ...mapMutations([
      'setFlagToken'
    ]),
    submitForm(formName,type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj = Object.assign({}, this.ruleForm);
          obj.password = encrypt(obj.password);
          if(type==='login'){
            login(obj).then(res=>{
              // console.log(type,res)
              if(!res)return;
              setToken(res.data.token);
              this.setFlagToken(true)
              this.$router.push({path:this.path||'/'})
              // getInfo().then(res=>{
              //   console.log('getInfo',res)
              // })
            })
            return
          }
          register(obj).then(res=>{
            console.log(type,res)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    validatorP() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeFrom(type, formName) {
      this.type = type;
      this.resetForm(formName);
    },
    setPath(path){
      this.path = path
    }
  }
};
</script>
<style scoped lang="less">
.admin {
  border-top: 1px solid transparent;
  padding-top: 100px;

  .content,
  .register {
    h1 {
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

