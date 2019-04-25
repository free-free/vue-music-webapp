import axios from 'axios'
import {HOST} from 'common/js/config'

const User = {
  baseUrl:'',
  get_profile:function(data, cb){
    return requester.sendGetReq(this.baseUrl + '/user/profile', data, cb);
  },
  update_profile:function(data, cb){
    return requester.sendPostReq(this.baseUrl + '/user/profile', data, cb);
  }
}


export default User;