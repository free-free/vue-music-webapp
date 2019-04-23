import axios from 'axios'
import {HOST} from 'common/js/config'

const baseUrl = 'http://47.107.174.224/api/user';
const instance = axios.create({
  baseURL: baseUrl
});

axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000;


export const sendPostReq = function(url, params, cb) {
  let qstring = Object.keys(params).map(function(key){
  	return key + '=' + params[key]
  }).join('&')
  return instance.post(url, qstring,{withCredentials: true,
  	headers:{
  		'Content-Type':'application/x-www-form-urlencoded'
  	}
  }).then(function(res){cb(res.data)});
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