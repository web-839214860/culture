import api from '../index'
import urls from './urls'
export default {

    postConvention(params) {   //添加非遗数据接口
        return api.post(urls.postConvention, params)
    },

    deleteConvention(params) {    //删除非遗数据接口
        return api.delete(urls.deleteConvention + '/' + params)
    },

    putConvention(params, id) {    //编辑非遗数据接口
        return api.put(urls.putConvention + '/' + id, params)
    },

    getConventionInfo(params) {    //查看某一条非遗信息接口
        return api.get(urls.getConventionInfo + '/' + params)
    },

    postAllConvention(params) {   //查看所有非遗数据接口
        return api.post(urls.postAllConvention, params)
    },

    getAllConvention() {    //下载所有非遗数据接口
        return api.get(urls.getAllConvention)
    }

}