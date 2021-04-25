import api from '../index'
import urls from './urls'
export default {

    postPublish(params) {   //添加公布时间接口
        return api.post(urls.postPublish, params)
    },

    getPublish() {   //获取公布时间接口
        return api.get(urls.getPublish)
    }

}