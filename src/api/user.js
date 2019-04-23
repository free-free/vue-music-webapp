import axios from 'axios'
import {HOST} from 'common/js/config'

export function getPlaylist() {
  const url = HOST + `/music/url?id=${id}`
  return axios.get(url)
}

export function getFeed() {
  const url = HOST + `/lyric?id=${id}`
  return axios.get(url)
}