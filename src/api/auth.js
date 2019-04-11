import * as requester from './requester.js';


const Auth = {
  baseUrl:'',
  login:function(data, cb){
    return requester.sendPostReq(this.baseUrl + '/login', data, cb);
  },
  logout:function(data, cb){
    return requester.sendPostReq(this.baseUrl + '/logout', data, cb);
  },
  register:function(data, cb){
    return requester.sendPostReq(this.baseUrl + '/register', data, cb);
  },
  getCosKeys:function(data, cb){
  	return requester.sendGetReq(this.baseUrl + '/cos/keys', data, cb);
  }
}


export default Auth;