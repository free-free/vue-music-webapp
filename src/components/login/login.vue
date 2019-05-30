<template>
<transition name="slide">
  <div class="login">
    <div class="background-mask">
      <div class="container">
          <el-form :model="loginData" :rules="loginFormRules" ref="loginForm" label-position="left" label-width="0px" class="ruleForm login-form" >
            <h3 class="title">登录Cloud Music</h3>
            <el-form-item prop="email" class="form-item">
              <el-input type="text" v-model="loginData.email"  auto-complete="on" class="form-input" placeholder="邮箱" @keyup.enter.native="onLoginBtnClick" prefix-icon="fa fa-user-circle-o" size="medium"></el-input>
            </el-form-item>
            <el-form-item prop="password"  class="form-item">
              <el-input type="password"
              class="form-input" v-model="loginData.password"  auto-complete="on" placeholder="密码" @keyup.enter.native="onLoginBtnClick" prefix-icon="fa fa-lock"  size="medium"></el-input>
            </el-form-item>
            <el-form-item class="form-item">
              <el-button type="primary" style="width:100%;background-color:#d44439;outline-color: #d44439;border-color: #d44439;" @click.native.prevent="onLoginBtnClick" :loading="logining">登录</el-button>
            </el-form-item>
            <div style="margin:10px auto;width:70%">
              <span style="color: white;" @click="onLaterLoginBtnClick">稍后登录</span>
              <span style="float: right;color: white;" @click="onRegisterBtnClick">注册>></span>
            </div>
          </el-form>
          
      </div>
  </div>
</div>
</transition>
</template>

<script>
  import Auth from '../../api/auth';
  import {mapMutations, mapGetters} from 'vuex';
  export default {
    data() {
      return {
        logining: false,
        loginData: {
          email: '',
          password: ''
        },
        loginFormRules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true,
        userName: '',
        password: '',
        isBtnLoading: false
      }
    },
    created () {
      if(JSON.parse(localStorage.getItem('user')) && JSON.parse( localStorage.getItem('user')).userName)
      {
        this.userName = JSON.parse(localStorage.getItem('user')).userName;
        this.password = JSON.parse(localStorage.getItem('user')).password;
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      },
      ...mapGetters({
        'profile':'uprofile'
      })
    },
    methods: {
      onLaterLoginBtnClick:function(){
        sessionStorage.setItem('tmpAccess', true);
        this.$router.push({"path": "/recommend"});
      },
      onRegisterBtnClick:function(){
        this.$router.push({"path":'/register'});
      },
      onLoginBtnClick:function() {
        var _this = this;
        this.$refs.loginForm.validate(function(valid) {
          if (valid) {
            var data = {};
            _this.logining = true;
            localStorage.setItem('email', _this.loginData['email']);
            localStorage.setItem('password', _this.loginData['password']);
            data['email'] = _this.loginData['email'];
            data['password'] = md5(_this.loginData['password']);
            Auth.login(data, function(res){
              _this.logining = false;
              switch(res.code){
                case 200:
                  console.log(res);
                  let profile =  {
                    avatarUrl: res.user.avatar,
                    bgImgUrl: res.user.back_img,
                    nickname: res.user.username,
                    gender: !res.user.gender ? "0": "1",
                    followerCnt:80
                  }
                  _this.setProfile(profile);
                  for (var key in res.user){
                    sessionStorage.setItem(key, res.user[key]);
                  }
                  _this.$router.push({ path: '/recommend' });
                  break;
                case 3005:
                  _this.$message({
                    message: "用户名或密码不正确!",
                    type: 'error'
                  });
                  break;
                case 40003:
                  _this.$message({
                    message: "用户未激活, 请登录邮箱激活!",
                    type: 'error'
                  });  
                  break;
                case 40004:
                  _this.$message({
                    message: "用户未注册!",
                    type: 'error'
                  });  
                  break;
                default:
                  break;
              }
              
            });
          }
        });
      },
      ...mapMutations({
        setProfile: 'SET_UPROFILE'
      })
    }
  }
</script>
<style lang="scss" scoped >
@import "~common/scss/variable";
.login {
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
  .login-form {
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
      margin-top:25px;
      height: 50px;
      width:70%;
    }
  }
  
}
</style>

