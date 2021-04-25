import api from '../index'
import urls from './urls'
export default {

    getCityInfo(params) {    //获取城市信息（一个）接口
        return api.get(urls.getCityInfo + '/' + params)
    },

    getCity(params) {    //获取城市信息接口
        return api.get(urls.getCity + '/' + params)
    }

}