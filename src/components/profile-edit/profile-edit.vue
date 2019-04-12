<template>
<transition name="slide">
  <div class="profile-wrapper">
    <div class="page-header" ref="pageHeader">
        <div class="back" @click="back">
          <i class="fa fa-angle-left"></i>
        </div>
        <div class="text">
          <h1 class="title">{{headerTitle}}</h1>
        </div>
      </div>
    <div class="profile-edit">
      <div class="profile-item avatar-edit">
        <input class="avatar-input" type="file" @change="selectAvatar()" accept="image/*" ref="avatar">
        <div class="item-title">头像</div>
        <div class="item-content avatar"><img :src="profile.avatarUrl" /></div>
      </div>
      <div class='profile-item bg-image-edit'>
        <input class="bg-image-input" type="file" @change="selectBgImg()" accept="image/*" ref="bgImage">
        <div class="item-title">背景图片</div>
        <div class="item-content bg-image"><img :src="profile.bgImgUrl" /></div>
      </div>
      <div class='profile-item username-edit' @click="onClickUsername">
        <div class="item-title">用户名</div>
        <div class="item-content username">{{profile.nickname}}</div>
      </div>
      <div class="profile-item gender-edit" @click="onClickGender">
        <div class="item-title">性别</div>
        <div class="item-content gender" >
          <el-switch
            v-model="profile.gender"
            active-color="#FFD1E4"
            inactive-color="#26A6E4"
            active-value="0"
            inactive-value="1"
            active-text="女"
            inactive-text="男"
            >
          </el-switch>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>

import {mapMutations, mapGetters} from 'vuex';
export default {
  data() {
    return {
      selectedBgImg:{},
      selectedAvatar:{},
      maxImgSize: 4096000,//4MB
    };
  },
  computed:{
    headerTitle(){
      return '编辑资料';
    },
    ...mapGetters({
      'profile':'uprofile'
    })
  },
  methods: {
    back () {
      this.$router.back();
    },
    onClickUsername(){
      this.$prompt('', '用户名', {
        confirmButtonText: '修改',
        cancelButtonText: '取消',
        inputPattern: /[^-~]{6,}/,
        inputErrorMessage: '用户名太短',
        inputPlaceholder: this.profile.username
      }).then(({ value }) => {
        if (value.length >= 6){
          this.updateProfile({'nickname':value});
        }
      }).catch(() => {
        
      });
    },
    onClickGender(val){
      this.updateProfile({'gender':this.profile.gender});
    },
    selectAvatar(){
      let fileList = this.$refs.avatar.files;
      for (let i = 0, len = fileList.length; i < len; i++) {
        let fileItem = {
          name: fileList[i].name,
          size: fileList[i].size,
          file: fileList[i]
        };
        let reader = new FileReader();
        reader.onloadend = e => {
          this.getBase64(e.target.result).then(url => {
            this.$set(fileItem, "src", url);
            this.selectedAvatar = fileItem;
            
            this.updateProfile({'avatarUrl': url});
          });
        };
        if (fileItem.size > this.maxImgSize) {
          this.$message.error('图像不能大于1MB');
        }else {
          reader.readAsDataURL(fileList[i]);
        }
      }
    },
    selectBgImg() {
      let fileList = this.$refs.bgImage.files;
      for (let i = 0, len = fileList.length; i < len; i++) {
        let fileItem = {
          name: fileList[i].name,
          size: fileList[i].size,
          file: fileList[i]
        };
        let reader = new FileReader();
        reader.onloadend = e => {
          this.getBase64(e.target.result).then(url => {
            this.$set(fileItem, "src", url);
            this.selectedBgImg = fileItem;
            this.updateProfile({'bgImgUrl': url});
          });
        };
        if (fileItem.size > this.maxImgSize) {
          this.$message.error('图像不能大于1MB');
        }else {
          reader.readAsDataURL(fileList[i]);
        }
      }
    },
    getBase64(url) {
      let self = this;
      let Img = new Image(),
        dataURL = "";
      Img.src = url;
      let p = new Promise(function(resolve, reject) {
        Img.onload = function() {
          //要先确保图片完整获取到，这是个异步事件
          let canvas = document.createElement("canvas"), //创建canvas元素
            width = Img.width, //确保canvas的尺寸和图片一样
            height = Img.height;
          // 默认将长宽设置为图片的原始长宽，这样在长宽不超过最大长度时就不需要再处理
          let ratio = width / height,
            maxLength = 1000,
            newHeight = height,
            newWidth = width;
          // 在长宽超过最大长度时，按图片长宽比例等比缩小
          if (width > maxLength || height > maxLength) {
            if (width > height) {
              newWidth = maxLength;
              newHeight = maxLength / ratio;
            } else {
              newWidth = maxLength * ratio;
              newHeight = maxLength;
            }
          }
          canvas.width = newWidth;
          canvas.height = newHeight;
          canvas.getContext("2d").drawImage(Img, 0, 0, newWidth, newHeight); //将图片绘制到canvas中
          dataURL = canvas.toDataURL("image/jpeg", 0.5); //转换图片为dataURL
          resolve(dataURL);
        };
      });
      return p;
    },
    ...mapMutations({
      'updateProfile': 'UPDATE_UPROFILE'
    }) 
  },
};
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";
.slide-enter-active, .slide-leave-active {
  transition: all 0.2s
}
.slide-enter, .slide-leave-to {
  transform: translate3d(30%, 0, 0);
  opacity: 0;
}

.profile-wrapper {
  position: fixed;
  z-index: 100000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width:100%;
  background:#fff;
  .page-header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 44px;
    background: #d44439;
    color: #fff;
    z-index: 100;
    .back {
      position: absolute;
      top: 0;
      left: 4px;
      .fa-angle-left {
        padding: 5px 10px;
        font-size: 30px;
      }
    }
    .text {
      position: absolute;
      left: 38px;
      line-height: 44px;
      font-size: $font-size-medium-x;
      @include no-wrap()
    }
  }
  .profile-edit{
    position:absolute;
    top:44px;
    bottom:0px;
    left:0px;
    right:0px;
    .profile-item{
      width:100%;
      height: 70px;
      position:relative;
      box-sizing:border-box;
      padding-left: 20px;
      padding-right: 20px;
      border-bottom: 0.5px solid #ddd;
      .bg-image-input{
        width:100%;
        position:absolute;
        left: 0;
        top: 0;
        height: 70px;
        opacity: 0;
      }
      .avatar-input{
        width:100%;
        position:absolute;
        left: 0;
        top: 0;
        height: 70px;
        opacity: 0;
      }
      .item-title{
        float:left;
        height: 70px;
        line-height:70px;
        color:#aaa;
        font-size:16px;
      }
      .item-content{
        float:right;
        height:70px;
        color:#555;
        font-size:16px;
        line-height:70px;
      }
      .avatar{
        width: 50px;
        height: 50px;
        padding-top:10px;
        border-radius:25px;
        img{
          width:50px;
          height: 50px;
          border-radius:25px;
        }
      }
      .bg-image{
        width: 50px;
        height: 50px;
        padding-top:10px;
        img{
          width:50px;
          height: 50px;
          border-radius: 5px;
        }
      }
      .username{
        text-align:center;
      }
      .gender{
        width: 80px;
        text-align:center;
      }
    }
  }
}


</style>