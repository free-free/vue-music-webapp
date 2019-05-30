<template>
<transition name="slide">
  <div class="user">
    <el-dialog  :visible.sync="dialogFormVisible" width="80%" :modal="false" :show-close="false">
      <el-form :model="songSheetForm">
        <el-form-item label="歌单名称" >
          <el-input  autocomplete="off" v-model="songSheetForm.name" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="back" @click="back">
      <i class="fa fa-angle-left"></i>
    </div>
    <div class="list-wrapper" ref="listWrapper">
      <scroll ref="mySongSheetsList" class="list-scroll":data="songSheets" >
        <div>
          <div class='profile'>
            <div class="bg-image"><img :src="profile.bgImgUrl"/></div>
            <div class="avatar"><img :src="profile.avatarUrl"/></div>
            <div class="edit-btn" @click="onProfileEditBtnClick">
              <i class="fa fa-pencil" aria-hidden="true"></i>
              <span class="text">编辑</span>
            </div>
            <div class="nickname">{{profile.nickname}}</div>
            <div class="info">
              <div class="gender" v-if="profile.gender=='0'">
                <i style="color:#FFD1E4;" class="fa fa-venus" aria-hidden="true"></i></div>
              <div class="gender" v-else>
                <i style="color:#26A6E4;" class="fa fa-mars" aria-hidden="true"></i></div>
              <div class="follower-cnt">Follower&nbsp;&nbsp;{{profile.followerCnt}}</div>
            </div>
          </div>
          <div class="switches-wrapper" >
            <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
          </div>
          <div ref="mySongSheetsList" v-if="currentIndex === 0">
            <div class="my-songsheet" ref="songSheet">
              <div class="play-history" @click="selectPlayHistory">
                <i class="fa fa-music" aria-hidden="true"></i>
                <div class="text-name">最近播放</div>
              </div>
              <div class="favorite-list" @click="selectFavorite">
                <i class="fa fa-heart" aria-hidden="true"></i>
                <div class="text-name">喜欢的音乐</div>
              </div>
              <div class="songsheet-hd">
                <div class="title">我的歌单</div>
                <div class="add-btn" @click="showSongSheetCreationPopup">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </div>
              </div>
              <song-sheet-list :data="songSheets" @select="selectSongSheet" ref="songSheetList"></song-sheet-list>
              <router-view></router-view>
            </div>
          </div>
          <div ref="feedList" v-if="currentIndex == 1">
            <div class="list-inner">
              <feed-list :data='feeds' ref="feedList" @retweet="onRetweet" @praise="onPraise" @clickview="onClickFeedView"></feed-list>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <div class="no-result-wrapper" v-show="noResult">
      <no-result :title="noResultDesc"></no-result>
    </div>
    <div class="post-feed" v-if="currentIndex == 1" >
      <el-button type="danger" icon="el-icon-plus"  class="post-feed-btn" @click="onPostFeedBtnclick" circle></el-button>
    </div>
  </div>
</transition>
</template>

<script>
import Switches from 'base/switches/switches'
import {mapGetters, mapActions,mapMutations} from 'vuex'
import NoResult from 'base/no-result/no-result'
import Scroll from 'base/scroll/scroll'
import FeedList from 'base/feed-list/feed-list'
import SongSheetList from 'base/songsheet-list/songsheet-list'
import {getUserSongSheets} from 'src/api/songsheet'
import {getSongSheetDetail} from 'src/api/songsheet'

const pinyin = require('pinyin');
export default {
  data () {
    return {
      currentIndex: 0,
      dialogFormVisible:false,
      switches: [
        {name: '音乐'},
        {name: '动态'}
      ],
      songSheets:[],
      songSheetForm:{
        name:""
      }
    }
  },
  computed: {
    noResult () {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length
      } else {
        return !this.playHistory.length
      }
    },
    count () {
      if (this.currentIndex === 0) {
        return this.favoriteList.length
      } else {
        return this.playHistory.length
      }
    },
    noResultDesc () {
      if (this.currentIndex === 0) {
        return '去寻找属于你自己最爱的MUSIC吧~'
      } else if (this.currentIndex === 0) {
        return '你还没有发表过动态'
      } else{
        return '你还没有听过歌呀~'
      }
    },
    feeds(){
      return this.formalizeFeeds(this.$store.state.feeds);
    },
    ...mapGetters({
      'favoriteList':'favoriteList',
      'playHistory':'playHistory',
      'singer':'singer',
      'profile':'uprofile',
    })
  },
  created(){
    /*
    if(!('nickname' in this.profile)){
      this.$router.push({
        path: '/login'
      });
      return ;
    }
    */
    this.getSongSheets();
  },
  methods: {
    selectFavorite(){
      let songSheet = {
        id: 0,
        name: "喜欢的音乐",
        bgImgUrl: 'http://img1.imgtn.bdimg.com/it/u=3221312703,524229742&fm=26&gp=0.jpg',
        updateTime: new Date(),
        tracks: this.favoriteList
      }
      this.setSongSheet(songSheet);
      this.$router.push({
        path: `/songsheet/0`
      });
    },
    selectPlayHistory(){
      let songSheet = {
        id: 0,
        name: "最近播放",
        bgImgUrl: 'http://img1.imgtn.bdimg.com/it/u=3221312703,524229742&fm=26&gp=0.jpg',
        updateTime: new Date(),
        tracks: this.playHistory
      }
      this.setSongSheet(songSheet);
      this.$router.push({
        path: `/songsheet/1`
      });
    },
    showSongSheetCreationPopup() {
      this.dialogFormVisible = true;
    },
    back () {
      this.$router.back()
    },
    switchItem (index) {
      this.currentIndex = index;
      //this.feeds = this.formalizeFeeds(this.getFeeds());
    },
    selectSongSheet(sid){
      getSongSheetDetail(sid).then(res=>{
        let playlist = res.data.playlist;
        let songSheet = {
          id: sid,
          name: playlist.name,
          bgImgUrl: playlist.coverImgUrl,
          updateTime: new Date(playlist.updateTime),
          tracks: playlist.tracks
        }
        this.setSongSheet(songSheet);
        this.$router.push({
          path: `/songsheet/${sid}`
        });
      })
    },
    sequence () {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
      if (list.length === 0) {
        return
      }
      this.sequencePlay({
        list: list
      })
    },
    getSongSheets () {
      getUserSongSheets('32953014').then((res) => {
        let s = res.data.playlist
        this.songSheets = [{
          id:1,
          title:"我的歌单",
          items: res.data.playlist
        }]
      })
    },
    getFeeds(){
    
    },
    formalizeFeeds(data){
      let ret = []
      data.forEach((item, index)=>{
        item['comment_num'] = item.comments.length;
        item['praise_num'] = item.praise;
        item['retweet_num'] = item.retweet;
        if (item.comments.length == 0){
          item['comment_num'] = '评论';
        }
        if(item.praise == 0) {
          item['praise_num'] = '点赞';
        }        
        if (item.retweet == 0){
          item['rewteet_num'] = '转发';  
        }
        let time = new Date(item.create_time)
        let month = time.getMonth() + 1
        let day = time.getDate()
        item['create_date'] =  `${month}月${day}日`
        ret.push(item);
      })
      return ret;
    },
    onRetweet(index, feed){
      let new_feed = {}
      new_feed['id'] = Math.floor(Math.random() * 10000);
      new_feed['praise'] = 0;
      new_feed['retweet'] = 0;
      new_feed['comments'] = []
      new_feed['create_time'] = new Date();
      new_feed['user'] = {}
      new_feed['user']['username'] = this.profile.nickname;
      new_feed['user']['avatar_url'] = this.profile.avatarUrl;
      new_feed['img_urls'] = feed['img_urls'];
      new_feed['desc'] = feed['desc']; 
      feed.retweet += 1;
      this.feeds[index] = this.formalizeFeeds([feed])[0]; 
      this.feeds.push(this.formalizeFeeds([new_feed])[0]);
      this.setFeed(this.feeds);
    },
    onPraise(index, feed){
      feed.praise += 1;
      this.feeds[index] = this.formalizeFeeds([feed])[0];
      this.setFeed(this.feeds);
    },
    onClickFeedView(index, feed){
      this.setCurrentFeed(index);
      this.$router.push({
        path:'/feed',
        query:{
          id: feed.id,
          uid: 12
        }
      });
    },
    onPostFeedBtnclick(){
      this.$router.push({
        path:'/feed/post'
      });
    },
    onProfileEditBtnClick(){
      this.$router.push({
        path:'/user/profile'
      });
    },
    ...mapActions([
      'insertSong',
      'sequencePlay',
    ]),
    ...mapMutations({
      setSinger: 'SET_SINGER',
      setSongSheet: 'SET_SONG_SHEET',
      setFeed:'SET_FEED',
      setProfile: 'SET_UPROFILE',
      setCurrentFeed: 'SET_CURRENT_FEED_IDX'
    })
  },
  components: {
    Switches,
    Scroll,
    NoResult,
    SongSheetList,
    FeedList
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
.user {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $color-background;
  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter, &.slide-leave-to {
    transform: translate3d(-50%, 0, 0);
    opacity: 0;
  }
  .back {
    position: absolute;
    top: 0;
    left: 4px;
    z-index:99999;
    .fa-angle-left {
      padding: 5px 10px;
      font-size: 30px;
      color: #fff;
    }
  }
  .list-wrapper {
    display:relative;
    width:100%;
    height:100%;
    .list-scroll {
      overflow:hidden;
      height:100%;
      .profile{
        height: 300px;
        width:100%;
        z-index:9999;
        color:white;
        padding-left:20px;
        position:relative;
        .bg-image{
          position:absolute;
          top:0;
          left:0;
          height:300px;
          width:100%;
          z-index:-1;  
          img{
            width:100%;
            height:100%;
          }
        }
        .avatar{
          width: 80px;
          height: 80px;
          padding-top:100px;
          margin-bottom: 10px;
          border-radius:40px;
          img{
            width:80px;
            height: 80px;
            border-radius:40px;
          }
        }
        .nickname{
          color: white;
          display:inline-block;
          height:20px;
          font-size:18px;
          line-height:20px;
          text-align:center;
          font-weight:bold;
        }
        .edit-btn{
          position:absolute;
          top:120px;
          right:50px;
          width: 80px;
          height: 30px;
          color:#f1f2f3;
          text-align:center;
          line-height:30px;
          font-size:14px;
          background: rgba(248,249,250,0.5);
          border-radius:5px;
          .text{
            padding-left:5px;
          }
        }
        .info{
          margin-top:10px;
          .gender{
            font-size: 12px;
            height: 25px;
            line-height:25px;
            display:inline-block;
            background:rgba(248,249,250,0.5);
            padding-left:5px;
            padding-right:5px;
            border-radius: 5px;
            color:#fff;
          }
          .follower-cnt{
            font-size: 12px;
            height: 25px;
            line-height:25px;
            display:inline-block;
            background:rgba(248,249,250,0.5);
            padding-left:5px;
            padding-right:5px;
            border-radius: 5px;
            color:#fff;
          }
        }  
      }
      .switches-wrapper {
        display: flex;
        align-items: center;
        background: $color-theme;
        height: 44px;
        position:absolute;
        top: 256px;
        width:100%;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        z-index:9999;
      }
      .my-songsheet{
        width:100%;
        background:#cfcfcf;
        .play-history, .favorite-list{
          padding:15px 20px;;
          font-size:20px;
          width: 100%;
          color:#aaa;
          background: $color-background;
          border-bottom: 1px solid #ddd;
          .text-name{
            font-size:14px;
            padding-left: 26px;
            display:inline-block;
            color:#333;
          }
        }
        .songsheet-hd{
          height:30px;
          line-height:30px;
          color:white;
          .title{
            height:30px;
            line-height:30px;
            float:left;
            margin-left:10px;
            font-size:14px;
          }
          .add-btn{
            float:right;
            height:30px;
            line-height:30px;
            margin-right:20px;
          }
        }
      }
      
    }
    
  }
  .post-feed{
    position:fixed;
    right: 20px;
    bottom:70px;
    z-index:999999999;
    .post-feed-btn{
      width:54px;
      height:54px;
      background:$color-theme;
      border:none;
      font-size:30px;
    }
  }
  .sequence-play {
    position: absolute;
    top: 44px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding-left: 16px;
    border-bottom: 1px solid rgb(228, 228, 228);
    .iconfont {
      font-size: 18px;
      color: $color-text;
      padding-right: 14px;
    }
    .text {
      font-size: $font-size-medium-x;
    }
    .count {
      font-size: $font-size-medium;
      color: $color-text-g;
    }
  }
  .no-result-wrapper {
    margin-top: 60%;
  }
}
</style>

<!--

<template>
<transition name="slide">
  <div class="user">
    <div class="back" @click="back">
      <i class="fa fa-angle-left"></i>
    </div>
    <div class="switches-wrapper">
      <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
    </div>
    <div class="sequence-play" @click="sequence">
      <i class="iconfont icon-bofangicon"></i>
      <span class="text">播放全部</span>
      <span class="count">(共{{count}}首)</span>
    </div>
    <div class="list-wrapper" ref="listWrapper">
      <scroll ref="favoriteList" class="list-scroll" :data="favoriteList" v-if="currentIndex === 0">
        <div class="list-inner">
          <song-list @select="selectSong" :songs="favoriteList"></song-list>
        </div>
      </scroll>
      <scroll ref="playList" class="list-scroll" v-if="currentIndex === 1" :data="playHistory">
        <div class="list-inner">
          <song-list @select="selectSong" :songs="playHistory"></song-list>
        </div>
      </scroll>
    </div>
    <div class="no-result-wrapper" v-show="noResult">
      <no-result :title="noResultDesc"></no-result>
    </div>
  </div>
</transition>
</template>

<script>
import Switches from 'base/switches/switches'
import {mapGetters, mapActions} from 'vuex'
import NoResult from 'base/no-result/no-result'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
// import {playlistMixin} from 'common/js/mixin'

export default {
  data () {
    return {
      currentIndex: 0,
      switches: [
        {name: '我的收藏'},
        {name: '最近播放'},
      ]
    }
  },
  computed: {
    noResult () {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length
      } else {
        return !this.playHistory.length
      }
    },
    count () {
      if (this.currentIndex === 0) {
        return this.favoriteList.length
      } else {
        return this.playHistory.length
      }
    },
    noResultDesc () {
      if (this.currentIndex === 0) {
        return '去寻找属于你自己最爱的MUSIC吧~'
      } else {
        return '你还没有听过歌呀~'
      }
    },
    ...mapGetters([
      'favoriteList',
      'playHistory'
    ])
  },
  methods: {
    back () {
      this.$router.back()
    },
    switchItem (index) {
      this.currentIndex = index
    },
    selectSong (song) {
      this.insertSong(song)
    },
    sequence () {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
      if (list.length === 0) {
        return
      }
      this.sequencePlay({
        list: list
      })
    },
    ...mapActions([
      'insertSong',
      'sequencePlay'
    ])
  },
  components: {
    Switches,
    SongList,
    Scroll,
    NoResult
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
.user {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $color-background;
  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter, &.slide-leave-to {
    transform: translate3d(-50%, 0, 0);
    opacity: 0;
  }
  .back {
    position: absolute;
    top: 0;
    left: 4px;
    .fa-angle-left {
      padding: 5px 10px;
      font-size: 30px;
      color: #fff;
    }
  }
  .switches-wrapper {
    display: flex;
    align-items: center;
    background: $color-theme;
    height: 44px;
  }
  .sequence-play {
    position: absolute;
    top: 44px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding-left: 16px;
    border-bottom: 1px solid rgb(228, 228, 228);
    .iconfont {
      font-size: 18px;
      color: $color-text;
      padding-right: 14px;
    }
    .text {
      font-size: $font-size-medium-x;
    }
    .count {
      font-size: $font-size-medium;
      color: $color-text-g;
    }
  }
  .list-wrapper {
    position: absolute;
    top: 84px;
    bottom: 0;
    width: 100%;
    .list-scroll {
      overflow: hidden;
      // width: 100%;
      height: 100%;
    }
  }
  .no-result-wrapper {
    margin-top: 60%;
  }
}
</style>
-->

<!--
<template>
  <div class="singer" ref="singer">
    <list-view :data="this.singers" @select="selectSinger" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import {getSingers} from 'src/api/singer'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

const pinyin = require('pinyin')
const HOT_NAME = '热门'
const HOT_SINGERS = 10

export default {
  mixins: [playlistMixin],
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingers()
  },
  methods: {
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    _getSingers () {
      getSingers().then((res) => {
        let s = res.data.artists
        s.map((item) => {
          let py = pinyin(item.name[0], {
            style: pinyin.STYLE_FIRST_LETTER
          })
          item.initial = py[0][0].toUpperCase()
        })
        this.singers = this._normalizeSinger(s)
      })
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGERS) {
          map.hot.items.push(new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
            aliaName: item.alias.join(' / ')
          }))
        }

        const key = item.initial
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.id,
          name: item.name,
          avatar: item.img1v1Url,
          aliaName: item.alias[0]
        }))
      })
      let hot = []
      let ret = []
      for (const key in map) {
        let val = map[key]
        if (val.title.match(/[A-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>
<style lang="scss" scoped>
 .singer {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
 }
</style>
-->
