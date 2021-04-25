import api from '../index'
import urls from './urls'
export default {

    postTrend(params) {  //发布动态接口
        return api.post(urls.postTrend, params)
    },

    deleteTrend(params) {    //删除动态接口
        return api.delete(urls.deleteTrend + '/' + params)
    },

    getTrendInfo(params) {    //查看某一条动态接口
        return api.get(urls.getTrendInfo + '/' + params)
    },

    postAllTrend(params) {   //查看所有动态接口
        return api.post(urls.postAllTrend, params)
    }

}