<template>
<transition name="slide">
  <div class="music-list">
    <div class="header" ref="header">
      <div class="back" @click="back">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="text">
        <h1 class="title">{{headerTitle}}</h1>
      </div>
    </div>
    <scroll class="list" 
    @scroll="scroll" 
    :probe-type="probeType" 
    :listen-scroll="listenScroll" 
    ref="list">
      <div class="music-list-wrapper">
        <div class="bg-image" :style="bgStyle" ref="bgImage">
          <div class="filter"></div>
          <div class="text">
            <h2 class="list-title">
              {{title}}
            </h2>
            <p class="update">{{updateTime}}</p>
          </div>
        </div>
        <div class="song-list-wrapper">
          <div class="sequence-play" v-show="songSheet.tracks.length" @click="playSongList">
            <i class="iconfont icon-bofangicon"></i>
            <span class="text">播放全部</span>
            <span class="count">(共{{songs.length}}首)</span>
          </div>
          <song-list @select="selectSong" :songs="songSheet.tracks"></song-list>
        </div>
      </div>
      <div v-show="!songSheet.tracks.length" class="loading-content">
        <loading></loading>
      </div>
    </scroll>
  </div>
</transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import SongList from 'base/song-list/song-list'
import {playlistMixin} from 'common/js/mixin'
import {createSong} from 'common/js/song'
import {mapGetters, mapActions} from 'vuex'

const RESERVED_HEIGHT = 44

export default {
  mixins: [playlistMixin],
  data () {
    return {
      songs: [],
      scrollY: 0,
      node: null,
      headerTitle: '',
      probeType: 3, 
      listenScroll: true
    }
  },
  created () {
    //
    this.getSongSheetDetail();
    this.probeType = 3;
    this.listenScroll = true;
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
  },
  computed: {
    headerTitleTouchDown () {
      return this.songSheet.name
    },
    bgStyle () {
      return `background-image: url(${this.songSheet.bgImgUrl})`
    },
    title () {
      return this.headerTitleTouchDown
    },
    updateTime () {
      let time = new Date(this.songSheet.updateTime)
      let month = time.getMonth() + 1
      let day = time.getDate()
      return `最近更新:${month}月${day}日`
    },
    ...mapGetters([
      'songSheet'
    ])
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.list.$el.style.bottom = bottom
      this.$refs.list.refresh()
    },
    getSongSheetDetail(){
      this.songs = this.songSheet.tracks;
    },
    normalizeSongs (list) {
      let ret = [];
      list.forEach((item) => {
        ret.push(createSong(item))
      })
      return ret;
    },
    selectSong (item, index) {
      this.selectPlay({
        list: this.songSheet.tracks,
        index: index
      })
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    back () {
      this.$router.back()
    },
    playSongList () {
      let list = this.songSheet.tracks
      this.sequencePlay({
        list: list
      })
    },
    ...mapActions([
      'selectPlay',
      'sequencePlay'
    ])
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
        this.$refs.header.style.background = `rgba(212, 68, 57, ${percent})`
      } else {
        this.$refs.header.style.background = `rgba(212, 68, 57, 0)`
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

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 44px;
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
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .music-list-wrapper {
      .bg-image {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 75%;
        transform-origin: top;
        background-size: cover;
        background-position: 0 30%;
        .filter {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          opacity: 0.2;
        }
        .text {
          position: absolute;
          width: 80%;
          height: 40px;
          bottom: 50px;
          left: 20px;
          color: #fff;
          .list-title {
            position: absolute;
            bottom: 0;
            font-style: italic;
            font-size: $font-size-large;
            line-height: 18px;
            font-weight: bold;
            letter-spacing: 1px;
            .music {
              position: absolute;
              top: -20px;
              left: 5px;
              font-style: italic;
              font-weight: bold;
              font-size: $font-size-medium;
            }
          }
          .update {
            position: absolute;
            top: 45px;
            left: 7px;
            line-height: 14px;
            font-size: $font-size-small;
          }
        }
      }
      .song-list-wrapper {
        padding: 41px 0 20px 0;
        border-radius: 10px;
        position: relative;
        top:-20px;
        background: $color-background;
        .sequence-play {
          position: absolute;
          // left: 8;
          top: 0px;
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
