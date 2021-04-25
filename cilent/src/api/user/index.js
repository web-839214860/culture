import api from '../index'
import urls from './urls'
export default {

    postLogin(params) {    //登录接口
        return api.post(urls.postLogin, params)
    },

    postUser(params) {  //注册、添加用户接口
        return api.post(urls.postUser, params)
    },

    putPassword(params) {   //修改密码接口
        return api.put(urls.putPassword, params)
    },

    putUser(params, id) {    //编辑用户信息接口
        return api.put(urls.putUser + '/' + id, params)
    },

    getUserInfo(params) {    //查看单个用户接口
        return api.get(urls.getUserInfo + '/' + params)
    },
    
    userInfo() {    //查看个人信息接口
        return api.get(urls.userInfo)
    }

}