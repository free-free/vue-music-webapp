import axios from 'axios'
import {HOST} from 'common/js/config'

export function getSingers () {
  const url = HOST + '/top/artists?limit=100'
  //const url = "http://47.107.174.224/api/singers/";

  return axios.get(url)
}

export function getSingerDetail (singerId) {
  const url = HOST + `/artists?id=${singerId}`

  return axios.get(url)
}

export function getMusic (musicId) {
  const url = HOST + `/song/url?id=${musicId}`

  return axios.get(url)
}
