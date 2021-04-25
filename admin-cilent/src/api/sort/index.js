import api from '../index'
import urls from './urls'
export default {

    postSort(params) {   //添加文章分类接口
        return api.post(urls.postSort, params)
    },

    getSort() {   //获取文章分类接口
        return api.get(urls.getSort)
    }

}