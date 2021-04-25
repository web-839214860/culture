import api from '../index'
import urls from './urls'
export default {

    getCity(params) {    //获取城市信息接口
        return api.get(urls.getCity + '/' + params)
    }

}