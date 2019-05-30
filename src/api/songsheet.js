import axios from 'axios'
import {HOST} from 'common/js/config'

export function getSongSheetDetail(sid) {
  //const url = HOST + `/music/url?id=${id}`
  const url = HOST + `/playlist/detail?id=${sid}`
  return axios.get(url)
}

export function getUserSongSheets(uid){
  const url = HOST + `/user/playlist?uid=${uid}`
  return axios.get(url);
}

export function getFeed() {
//  const url = HOST + `/lyric?id=${id}`
  return axios.get(url)
}

export function postFeed(){

}

export function deleteFeed(){

}

