import api from '../index'
import urls from './urls'
export default {

    getSort() {   //获取文章分类接口
        return api.get(urls.getSort)
    }

}