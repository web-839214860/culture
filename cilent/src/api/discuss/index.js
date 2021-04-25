import api from '../index'
import urls from './urls'
export default {

    postDiscuss(params) {  //发表评论接口
        return api.post(urls.postDiscuss, params)
    },

    deleteDiscuss(params) {    //删除评论接口
        return api.delete(urls.deleteDiscuss + '/' + params)
    },

    postAllDiscuss(params) {   //查看所有评论接口
        return api.post(urls.postAllDiscuss, params)
    }

}