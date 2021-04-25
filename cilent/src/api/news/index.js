import api from '../index'
import urls from './urls'
export default {

    putNewsView(params) {    //修改阅读量接口
        return api.put(urls.putNewsView + '/' + params)
    },

    getNewsInfo(params) {    //查看某一篇文章接口
        return api.get(urls.getNewsInfo + '/' + params)
    },

    postAllNews(params) {   //查看所有文章接口
        return api.post(urls.postAllNews, params)
    }

}