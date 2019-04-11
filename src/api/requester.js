import axios from 'axios'
import {HOST} from 'common/js/config'

const baseUrl = 'http://rap2api.taobao.org/app/mock/163887/user/';
const instance = axios.create({
  baseURL: baseUrl
});

axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000;


export const sendPostReq = function(url, params, cb) {
  return instance.post(url, params).then(function(res){cb(res.data)});
}

export const sendGetReq = function(url, params, cb) {
  return instance.get(url,  {params:params}).then(function(res){cb(res.data)});
}

export const sendPutReq = function(url, params, cb) {
  return instance.put(url, params).then(function(res){cb(res.data)});
}


export const sendDeleteReq = function(url, params, cb) {
  return instance.delete(url, {params:params}).then(function(res){cb(res.data)});
}

export const sendPatchReq = function(url, params, cb) {
  return instance.patch(url, params).then(function(res){cb(res.data)});
}