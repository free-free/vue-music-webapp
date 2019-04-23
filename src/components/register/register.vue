<template>
<transition name="slide">
  <div class="register">
    <div class="background-mask">
      <div class="container">
        <el-form :model="registerData" :rules="registerFormRules" ref="registerForm" label-position="left" label-width="0px" class="ruleForm register-form">
          <h3 class="title">注册 CloudMusic</h3>
          <el-form-item prop="username" class="form-item">
            <el-input type="text" v-model="registerData.username"  auto-complete="on" placeholder="用户名" @keyup.enter.native="onRegisterBtnClick"  prefix-icon="fa fa-user" size="medium"></el-input>
          </el-form-item>
          <el-form-item prop="email" class="form-item">
            <el-input type="text" v-model="registerData.email"  auto-complete="on" placeholder="邮箱" @keyup.enter.native="onRegisterBtnClick" prefix-icon="fa fa-envelope" size="medium">
            </el-input>
          </el-form-item>
          <el-form-item prop="password"  class="form-item">
            <el-input type="password" v-model="registerData.password"  auto-complete="on" placeholder="密码" @keyup.enter.native="onRegisterBtnClick" size="medium" prefix-icon="fa fa-lock"></el-input>
          </el-form-item>
          <el-form-item class="form-item">
            <el-button style="width:100%;margin-top:10px;" type="success" @click.native.prevent="onRegisterBtnClick" :loading="registering">注册</el-button>
          </el-form-item>
          <div style="margin:10px auto;width:70%">
            <span style="color: white;" @click="onBackLoginBtnClick"><<登录</span>
          </div>
        </el-form>
      </div>
  </div>
</div>
</transition>
</template>

<script>
  import Auth from '../../api/auth';
  export default {
    data() {
      return {
        registering: false,
        registerData:{
          email:'',
          username:'',
          password:''
        },
        registerFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min:6, max:30, message: '用户名长度不能小于6位', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { pattern:'^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$', trigger:'blur', message: "请输入正确的邮箱"}
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min:6, max:30, message: '密码长度不能小于7位', trigger: 'blur' },
          ]
        },
        checked: true,
        userName: '',
        password: '',
        isBtnLoading: false
      }
    },
    created () {
      if(JSON.parse( localStorage.getItem('user')) && JSON.parse( localStorage.getItem('user')).userName){
        this.userName = JSON.parse( localStorage.getItem('user')).userName;
        this.password = JSON.parse( localStorage.getItem('user')).password;
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    methods: {
      onBackLoginBtnClick:function(){
        this.$router.push({ path: '/login' })
      },
      onRegisterBtnClick:function(){
        var _this = this;
        this.$refs.registerForm.validate(function(valid) {
          if (valid) {
            var data = {};
            _this.registering = true;
            data['username'] = _this.registerData['username'];
            data['password'] = md5(_this.registerData['password']);
            data['email'] = _this.registerData['email'];
            Auth.register(data, function(res){
              _this.registering = false;
              switch(res.code){
                case 3000:
                  localStorage.setItem('username', _this.
                      registerData['username'])
                  localStorage.setItem('email', _this.registerData['email']);
                  localStorage.setItem('password', _this.registerData['password']);
                  for (var key in res.user){
                    sessionStorage.setItem(key, res.user[key]);
                  }
                  _this.$router.push({ path: '/' });
                break;
                case 3007:
                  _this.$message({
                    message:  res.message,
                    type: 'info'
                  });
                break;
                case 50001:
                  _this.$message({
                    message: "用户注册失败,请重试!",
                    type: 'error'
                  });
                break;
                case 60001:
                  _this.$message({
                    message: "用户注册已打烊，请择日再来!",
                    type: 'error'
                  });
                break;
                default:
                  if (res.code == 3000) {
                    /*
                    _this.$message({
                      message: "激活邮件已发送到你的邮箱，请去激活账号",
                      type: 'info',
                      center: true,
                      duration: 2500,
                      onClose:function(){
                        _this.loginData.account = _this.registerData['email'];
                        _this.loginData.password = _this.registerData['password'];
                        _this.$refs.registerForm.resetFields();
                        window.location.reload();
                      }
                    });
                    */
                  }
                break;
              }    
            });
          }
        });
      },
    }
  }
</script>
<style lang="scss" scoped >
@import "~common/scss/variable";
.register {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $color-background;
  background:url('../../assets/login-bg.jpg');
  background-repeat:no-repeat;
  background-position:0% 0%;
  background-size:cover;
  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.0s;
  }
  &.slide-enter, &.slide-leave-to {
    transform: translate3d(-50%, 0, 0);
    opacity: 0;
  }
  .container{
    position:fixed;
    top: 40%;
    left:50%;
    width:100%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    background-color: transparent;
  }
  .background-mask{
    width:100%;
    height:100vh;
    background-color:#000;
    background: rgba(0, 0, 0, 0.4);
    box-sizing:border-box;
    display:flex;justify-content:center;
    align-items:center;
  }
  .register-form {
    margin: 0px auto;
    vertical-align:middle;
    .title {
      margin: 10px auto 40px auto;
      text-align: center;
      color: #fff;
    }
    .form-item{
      margin-left: auto;
      margin-right: auto;
      margin-top:10px;
      height: 45px;
      width:70%;
    }
  }
  
}
</style>