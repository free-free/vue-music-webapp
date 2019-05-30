import {playMode} from 'common/js/config'
import {loadSearch, loadDefaultFeeds, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  musicList: {},
  singer: {},
  // 播放
  playing: false,
  // 全屏
  fullScreen: false,
  playlist: [],
  // 顺序列表
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 当前播放索引
  currentIndex: -1,
  disc: {},
  topList: {},
  songSheet: {},
  uprofile:{},
  currentFeedIdx:0,
  feeds:loadDefaultFeeds(),
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
