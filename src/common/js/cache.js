// 操作和 storage 相关代码

import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEANGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

export function loadDefaultFeeds(){
  var feeds = [{
    id: Math.ceil(Math.random() * 100000000000) ,
    create_time: new Date(),
    user:{
      avatar_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554609161648&di=97d035fae1fb2bf304e1ec24ab08a2fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F15%2F20180915084441_kmsfk.thumb.224_0.jpg",
      username: "有糖吃可好"
    },
    img_urls:[
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555316588&di=3bae5172f6a84fd898baf5072c2c07ba&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.ledinside.cn%2Fled%2F2014%2F12%2F18%2F653100001418886130.jpg",
      "http://img1.imgtn.bdimg.com/it/u=3221312703,524229742&fm=26&gp=0.jpg",
    ],
    desc:"在隆冬和盛夏之间，在冷酷和热烈之间，在一片渺茫和尘埃落定之间，有很多东西痒痒地生发出来，比如希望，比如理想，比如爱。如果你想到了些什么，不如现在就去试试。反正，春天很短的。",
    praise: 0,
    comments: [],
    retweet: 0,
  },
  {
    id: Math.ceil(Math.random() * 100000000000),
    create_time: new Date(),
    user:{
      avatar_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554609161648&di=97d035fae1fb2bf304e1ec24ab08a2fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F15%2F20180915084441_kmsfk.thumb.224_0.jpg",
      username: "有糖吃可好"
    },
    img_urls:[
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555316588&di=3bae5172f6a84fd898baf5072c2c07ba&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.ledinside.cn%2Fled%2F2014%2F12%2F18%2F653100001418886130.jpg",
      "http://img1.imgtn.bdimg.com/it/u=3221312703,524229742&fm=26&gp=0.jpg",
    ],
    desc:"在隆冬和盛夏之间，在冷酷和热烈之间，在一片渺茫和尘埃落定之间，有很多东西痒痒地生发出来，比如希望，比如理想，比如爱。如果你想到了些什么，不如现在就去试试。反正，春天很短的。",
    praise: 10,
    comments: [],
    retweet: 10,
  }];
  feeds = [];
  return feeds;
}

export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEANGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function deleteSearch (query) {
  // 首先获取
  let searches = storage.get(SEARCH_KEY, [])

  deleteFromArray(searches, (item) => {
    return item === query
  })
  console.log('delet', searches)

  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

export function savePlay (song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay () {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite () {
  return storage.get(FAVORITE_KEY, [])
}
