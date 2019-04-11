<template>
<transition name="slide">
  <div class="feed-wrapper">
    <div class="page-header" ref="pageHeader">
        <div class="back" @click="back">
          <i class="fa fa-angle-left"></i>
        </div>
        <div class="text">
          <h1 class="title">{{headerTitle}}</h1>
        </div>
      </div>
    <div class="feed-post">
      <textarea class='feed-text' v-model="feed.text" placeholder="发表您的动态" type="textarea" rows="4" ></textarea>
      <image-uploader @getFiles='getImageList' @removeFiles='removeImage'></image-uploader>
      <div class="btn-wrapper">
        <el-button class='btn-send'  type="primary" @click="onSendPostBtnClick">发布</el-button>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import ImageUploader from 'base/image-uploader/image-uploader'
export default {
  name: "FeedPost",
  data() {
    return {
      dynamicContent: "", 
      feed:{
        text:""
      },
      imgList: [],
      FilecodeList: [],
      isSubmit: false
    };
  },
  computed:{
    headerTitle(){
      return '发表动态';
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    getImageList(files) {
      this.$nextTick(() => {
        for (let i = 0, len = files.length; i < len; i++) {
          this.imgList.push(files[i].src.split("base64,")[1]);
          //上传图片
          //   this._getFileCode({
          //     Base64Str: files[i].src.split("base64,")[1],
          //     AttachmentType: this.$enums.AttachmentType.Activity
          //   });
        }
      });
    },
    //删除图片
    removeImage(index) {
      this.imgList.splice(index, 1);
    },
    //上传图片获取fileCode (目前该方法没调用，供参考)
    _getFileCode(obj) {
      // Indicator.open(this.lang.dynamic_publishing);
      this.$http
        .post(this.$profileApi.Shared_UploadImage, obj)
        .then(data => {
          if (data.Rstatus) {
            this.FilecodeList.push(data.Rdata);
          } else {
            // Toast(this.lang.dynamic_upload_fail);
          }
        })
        .catch(err => {
          //   Toast(this.lang.dynamic.dynamic_net_error);
        });
    },
    //创建动态 (发布动态的请求)
    createDynamic(arr) {
      this.isSubmit = true;
      this.$http
        .post(this.$profileApi.Dynamic_CreateDynamic, {
          Subject: this.feed.text,
          Files: arr
        })
        .then(data => {
          this.isSubmit = false;
          if (data.Rstatus) {
            // Toast(this.lang.dynamic_publish_ok);
            this.$router.back();
          } else {
            // Toast(this.lang.dynamic_publish_fail);
          }
        })
        .catch(err => {
          //   Toast(this.lang.dynamic_net_error);
        });
    },
    //发布事件
    onSendPostBtnClick() {
      console.log("内容" + this.feed.text);
      console.log(this.imgList);
      //   if (this.dynamicContent.trim() == "" && this.imgList.length === 0) {
      //     // Toast(this.lang.dynamic_content_no_null);
      //     return;
      //   }
      //   //当图片还没上传成功
      //   let self = this;
      //   var timer = setInterval(function() {
      //     if (
      //       self.FilecodeList &&
      //       self.imgList &&
      //       self.FilecodeList.length < self.imgList.length
      //     ) {
      //       // Indicator.open(self.lang.dynamic_uploading)
      //       self.isSubmit = true;
      //     } else {
      //       clearInterval(timer);
      //       // Indicator.close();
      //       self.createDynamic(self.FilecodeList);
      //     }
      //   }, 200);
    }
  },
  components: {
    ImageUploader
  }
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

.feed-wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width:100%;
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
  .feed-post{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position:absolute;
    top:44px;
    bottom:0px;
    left:0px;
    right:0px;
    .feed-text{
        width: 100%;
        height:100px;
        padding:12px 10px;
        box-sizing:border-box;
        font-size:14px;
        border:none;
        outline:none;
        line-height:20px;
    }
    .btn-wrapper {
      display: flex;
      position:absolute;
      bottom: 60px;
      width: 100%;
      margin-left:10%;
      margin-right: 10%;
      .btn-send {
        display: block;
        width: 80%; 
        background:$color-theme;
        border:none; 
      }
      
    }
  }
  
}
#feed-post canvas {
  background: #000 !important;
}

</style>