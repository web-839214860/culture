import api from '../index'
import urls from './urls'
export default {

    getType() {    //获取分类信息接口
        return api.get(urls.getType)
    }

}