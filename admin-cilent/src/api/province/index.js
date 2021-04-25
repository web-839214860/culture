import api from '../index'
import urls from './urls'
export default {

    getProvince() {    //获取省份信息接口
        return api.get(urls.getProvince)
    }

}