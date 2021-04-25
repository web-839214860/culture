import api from '../index'
import urls from './urls'
export default {

    putEnshrine(params, id) {    //收藏、取消收藏接口
        return api.put(urls.putEnshrine + '/' + id, params)
    },

    postAllEnshrine(params) {   //查看所有收藏接口
        return api.post(urls.postAllEnshrine, params)
    }

}