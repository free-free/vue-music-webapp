import * as types from './mutation-types'
const mutations = {
  [types.SET_MUSIC_LIST] (state, musicList) {
    state.musicList = musicList
  },
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC] (state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST] (state, topList) {
    state.topList = topList
  },
  [types.SET_SEARCH_HISTORY] (state, history) {
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY] (state, history) {
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST] (state, list) {
    state.favoriteList = list
  },
  [types.SET_SONG_SHEET] (state, songsheet){
    state.songSheet = songsheet;
  },
  [types.UPDATE_UPROFILE] (state, profile){
    for(let key in profile){
      if (key in state.uprofile){
        state.uprofile[key] = profile[key]
      }
    }
  },
  [types.SET_UPROFILE] (state, profile){
    state.uprofile = profile;
  },
  [types.SET_FEED](state, feeds){
    state.feeds = feeds    
  },
  [types.INSERT_FEED](state, feed){
    state.feeds.unshift(feed)
  },
  [types.SET_CURRENT_FEED_IDX](state, idx){
    state.currentFeedIdx = idx;
  }
}

export default mutations
