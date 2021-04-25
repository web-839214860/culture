import api from '../index'
import urls from './urls'
export default {

    getConventionInfo(params) {    //查看某一条非遗信息接口
        return api.get(urls.getConventionInfo + '/' + params)
    },

    postAllConvention(params) {   //查看所有非遗数据接口
        return api.post(urls.postAllConvention, params)
    }

}