import api from '../index'
import urls from './urls'
export default {

    getProvinceInfo(params) {    //获取省份信息（一个）接口
        return api.get(urls.getProvinceInfo + '/' + params)
    },

    getProvince() {    //获取省份信息接口
        return api.get(urls.getProvince)
    }

}