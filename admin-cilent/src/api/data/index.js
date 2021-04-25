import api from '../index'
import urls from './urls'
export default {

    getProvinceNum() {    //获取省份总数接口
        return api.get(urls.getProvinceNum)
    },
    
    getTypeNum() {  //获取分类总数接口
        return api.get(urls.getTypeNum)
    },

    getProvinceTypeNum(params) {    //获取省份分类总数接口
        return api.get(urls.getProvinceTypeNum + '/' + params)
    }

}