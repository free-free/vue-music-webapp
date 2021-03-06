<template>
<transition name="slide">
  <div class="feed-detail">
    <div class="page-header" ref="pageHeader">
      <div class="back" @click="back">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="text">
        <h1 class="title">{{headerTitle}}</h1>
      </div>
    </div>
    <scroll class="feed-detail-scroll"
    @scroll="scroll"
    :probe-type="probeType"
    :listen-scroll="listenScroll"
    ref="list">
      <div class="feed-detail-wrapper">
        <div class="feed-content" ref="feedContent">
          <div class="header" >
            <div class="user-avatar"><img :src="feed.user.avatar_url" /></div>
            <div>
              <span class='username'>{{feed.user.username}}</span>
              <span class='share-time'>{{feed.create_date}}</span>
            </div>
          </div>
          <div class="feed-desc-text">{{feed.desc}}</div>
          <div class="feed-images-view">
            <img v-gallery="feed.id" :src="url" v-for="url in feed.img_urls" :key="url" />
          </div>
          <!--
          <div class="feed-operation">
            <span class="retweet"><i class="fa fa-retweet " aria-hidden="true"></i><span>{{feed.retweet}}</span></span>
            <span class="comment"><i class="fa fa-comment-o " aria-hidden="true"></i><span>{{feed.comment}}</span></span>
            <span class="praise"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i><span>{{feed.praise}}</span></span>
          </div>
          -->
        </div>
        <div class="comment-wrapper">
          <div class="comment-title">最新评论</div>
          <ul class="comment-list">
            <li v-for="com in comments" class="comment-content" :key="com.id" ref="commentConent" >
              <div class="comment-header" >
                <div class="comment-user-avatar"><img :src="com.user.avatar_url" /></div>
                <div>
                  <span class='comment-username'>{{com.user.username}}</span>
                  <span class='comment-time'>{{com.create_date}}</span>
                </div>
              </div>
              <div class="comment-text">{{com.text}}</div>
            </li>
          </ul>
        </div>
      </div>
      
    </scroll>
    <div class="comment-poster-wrapper">
      <div class='comment-textarea'>
        <textarea 
          class='text-input'
          type="textarea"
          placeholder="请输入内容"
          v-model="postComment.text">
        </textarea>
      </div>
      <div class='comment-btn'>
         <el-button type="primary" class='btn' @click="onPostCommentBtnClick"><i style="font-size:20px;" class="fa fa-comment" aria-hidden="true"></i>评论</el-button>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import SongList from 'base/song-list/song-list'
import {createSong} from 'common/js/song'
import {mapGetters, mapActions,mapMutations} from 'vuex'
const RESERVED_HEIGHT = 44

export default {
  
  data () {
    return {
      scrollY: 0,
      node: null,
      headerTitle: '',
      postComment:{
        text:''
      }
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.imageHeight = this.$refs.feedContent.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
  },
  computed: {
    headerTitleTouchDown () {
      return this.feed.user.username;
    },
    title () {
      return this.headerTitleTouchDown
    },
    feed(){
      return this.formalizeFeed(this.$store.state.feeds[this.$store.state.currentFeedIdx]);
    },
    comments(){
      return this.formalizeComments(this.$store.state.feeds[this.$store.state.currentFeedIdx].comments);
    },
    ...mapGetters({
      'feeds':'feeds',
      'profile':'uprofile',
      'currentFeedIdx':'currentFeedIdx'
    })
  },
  methods: {
    formalizeFeed(feed){
      feed['comment'] = '评论';
      if (feed.comments.length > 0){
        feed.comment = feed.comments.length;
      }
      if(feed.praise == 0) {
        feed.praise = '点赞';
      }
      if (feed.retweet == 0){
        feed.rewteet = '转发';  
      }
      let time = new Date(feed.create_time)
      let month = time.getMonth() + 1
      let day = time.getDate()
      feed['create_date'] =  `${month}月${day}日`
      return feed
    },
    formalizeComments(comments){
      let ret = []
      comments.forEach((item, index) => {
        let time = new Date(item.create_time)
        let month = time.getMonth() + 1
        let day = time.getDate()
        item['create_date'] =  `${month}月${day}日`
        ret.push(item)
      });
      return ret;
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    back () {
      this.$router.back()
    },
    onPostCommentBtnClick(){
      let data = {};
      data['text'] = this.postComment.text;
      data['id'] = new Date().getTime();
      data['create_time'] = new Date();
      data['user'] = {}
      data['user']['avatar_url'] = this.profile.avatarUrl;
      data['user']['username'] = this.profile.nickname
      this.feeds[this.currentFeedIdx].comments.unshift(this.formalizeComments([data])[0]);
      this.setFeed(this.feeds);
      this.postComment.text = '';
    },
    ...mapMutations({
      setFeed:'SET_FEED',
      setCurrentFeed: 'SET_CURRENT_FEED_IDX'
    })
  },
  watch: {
    scrollY (newY) {
      const percent = Math.abs(newY / this.imageHeight)
      if (newY < (this.minTranslateY + RESERVED_HEIGHT - 20)) {
        this.headerTitle = this.headerTitleTouchDown
      } else {
        this.headerTitle = ''
      }
      if (newY < 0) {
        this.$refs.pageHeader.style.background = `rgba(212, 68, 57, ${percent})`
      } else {
        this.$refs.pageHeader.style.background = `rgba(212, 68, 57, 0)`
      }
    }
  },
  components: {
    SongList,
    Scroll,
    Loading
  }
}
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

.feed-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width:100%;
  background: $color-background;
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
  .feed-detail-scroll {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .feed-detail-wrapper {
      .feed-content {
        position: relative;
        /*height: 0;*/
        width: 100%;
        box-sizing: border-box;
        transform-origin: top;
        padding: 60px 14px 30px 14px;
        .header{
          display:flex;
          height: 40px;
          width: 100%;
          .user-avatar{
            width:40px;
            height:40px;
            border-radius:20px;
            margin-right: 10px;
            img{
              width:40px;
              height:40px;
              border-radius:20px;
            }
          }
          .username{
            display:block;
            padding-top:6px;
            font-size: 14px;
            color: #2273CF;
          }
          .share-time{
            display:block;
            padding-top:5px;
            color:#aaa;
            font-size:12px; 
          }
        }
        .feed-desc-text{
          font-size: 16px;
          color: #111;
          width: 100%;
          padding-top: 10px;
          padding-bottom: 10px;
          line-height: 22px;
        }
        .feed-images-view{
          height: 224px;
          overflow-x:auto;
          overflow-y:hidden;
          img{
            width: 100%;
            border-radius: 5px;
            height: 224px;
          }
        }
        .feed-operation{
            height: 50px;
            line-height: 50px;
            color:#aaa;
            font-size: 16px;
            .retweet{
              display:inline-block;
              width: 30%;
              color: #aaa;
              span{
                padding-left: 5px;
                padding-right: 5px;
                font-size: 14px;
              }
            }
            .praise{
              display:inline-block;
              width: 30%;
              span{
                padding-left: 5px;
                padding-right: 5px;
                font-size: 14px;
              }
            }
            .comment{
              display:inline-block;
              width: 30%;
              span{
                padding-left: 5px;
                padding-right: 5px;
                font-size: 14px;
              }
            }
         }
      }
      .comment-wrapper {
        padding: 20px 14px 40px 14px;
        border-top: 1px solid #ddd;
        .comment-title{
          color:#555;
          font-weight: 600;
          font-size: 16px;
        }
        .comment-list{
          .comment-content{
            padding-top:20px;
            padding-bottom:10px;
            border-bottom: 0.5px solid #ddd;
            .comment-header{
              display:flex;
              height: 40px;
              width: 100%;
              .comment-user-avatar{
                width:30px;
                height:30px;
                border-radius:15px;
                margin-right: 10px;
                img{
                  width:30px;
                  height:30px;
                  border-radius:15px;
                }
              }
              .comment-username{
                display:block;
                padding-top:4px;
                font-size: 12px;
                color: #2273CF;
              }
              .comment-time{
                display:block;
                padding-top:4px;
                color:#aaa;
                font-size:12px; 
              }
            }
            .comment-text{
              font-size: 14px;
              color: #555;
              width: 100%;
              padding-top: 10px;
              padding-bottom: 10px;
              line-height: 18px;
            }
          }
        }
      }
    }
  }
  .comment-poster-wrapper{
    position:fixed;
    bottom:0px;
    width: 100%;
    background:white;
    left:0px;
    .comment-textarea{
      position:absolute;
      left:0px;
      bottom:0px;
      width: 80%;
      height:46px;
      .text-input{
        width: 100%;
        height:46px;
        padding:12px 10px;
        box-sizing:border-box;
        font-size:14px;
        border:none;
        outline:none;
        line-height:20px;
      }
    }
    .comment-btn{
      position:absolute;
      bottom:0px;
      right:0px;
      left:80%;
      width: 20%;
      .btn{
        width:100%;
        height: 46px;  
        letter-spacing: 3px;
        font-size:16px;
      }
      
    }
  }
  .loading-content {
    position: fixed;
    width: 100%;
    top: 70%;
    transform: translateY(-50%);
  }
}

</style>
