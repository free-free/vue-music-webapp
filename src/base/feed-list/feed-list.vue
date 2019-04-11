<template>
  <div class='feed-list'>
    <ul>
      <li v-for="(feed, index) in data" class="list-group" :key="feed.id" ref="listGroup" >
        <div class="header"  @click.prevent="onClickFeedView(index, feed, $event)" >
          <div class="user-avatar"><img :src="feed.user.avatar_url" /></div>
          <div>
            <span class='username'>{{feed.user.username}}</span>
            <span class='share-time'>{{feed.create_date}}</span>
          </div>
        </div>
        <div class="feed-desc-text"  @click.prevent="onClickFeedView(index, feed, $event)" >{{feed.desc}}</div>
        <div class="feed-images-view">
          <img v-gallery="feed.id" :src="url" v-for="url in feed.img_urls" :key="url" />
        </div>
        <div class="feed-operation">
          <span class="retweet"  @click.prevent="onClickRetweet(index, feed)"><i class="fa fa-retweet " aria-hidden="true"></i><span>{{feed.retweet_num}}</span></span>
          <span class="comment"  @click.prevent="onClickFeedView(index, feed, $event)"><i class="fa fa-comment-o " aria-hidden="true"></i><span>{{feed.comment_num}}</span></span>
          <span class="praise" @click.prevent="onClickPraise(index,feed)"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i><span>{{feed.praise_num}}</span></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      
    }
  },
  created () {
  },
  methods: {
    onClickFeedView(index, feed, e){
      this.$emit('clickview', index, feed);
    },
    onClickRetweet(index, feed){
      this.$emit('retweet', index, feed);
    },
    onClickPraise(index, feed){
      this.$emit('praise', index, feed);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
.feed-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group {
    padding: 40px 14px 10px 14px;
    border-bottom: solid 0.5px #bbb;
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
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 50px;
      line-height: 22px;
      letter-spacing: 0.2px;
    }
    .feed-images-view{
      height: 224px;
      padding-left: 50px;
      overflow-x:auto;
      overflow-y:hidden;
      img{
        width: 96%;
        border-radius: 5px;
        height: 224px;
      }
    }
    .feed-operation{
        padding-left: 50px;
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
    .list-group-title {
      height: 20px;
      line-height: 20px;
      padding-left: 12px;
      margin-bottom: 10px;
      font-size: $font-size-small;
      color: #fff;
      background:rgba(0, 0, 0, 0.1);
    }
   
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 200px 0;
    border-radius: 3px;
    text-align: center;
    font-family:Helvetica;
    .item {
      padding: 5px 5px;
      line-height: 1;
      color: $color-text-g;
      font-size: $font-size-small;
      font-weight: bold;
      &.current {
        color: $color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 20px;
      line-height: 20px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
