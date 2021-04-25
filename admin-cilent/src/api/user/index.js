import api from '../index'
import urls from './urls'
export default {

    postLogin(params) { //登录接口
        return api.post(urls.postLogin, params)
    },

    postUser(params) {  //注册、添加用户接口
        return api.post(urls.postUser, params)
    },

    deleteUser(params) {    //删除用户接口
        return api.delete(urls.deleteUser + '/' + params)
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

    postAllUser(params) {   //查看所有用户接口
        return api.post(urls.postAllUser, params)
    },

    userInfo() {    //查看个人信息接口
        return api.get(urls.userInfo)
    },

    getAllUser() {   //下载所有用户接口
        return api.get(urls.getAllUser)
    }

}