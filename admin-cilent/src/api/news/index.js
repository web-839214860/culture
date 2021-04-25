import api from '../index'
import urls from './urls'
export default {

    postNews(params) {  //添加文章接口
        return api.post(urls.postNews, params)
    },

    deleteNews(params) {    //删除文章接口
        return api.delete(urls.deleteNews + '/' + params)
    },

    putNews(params, id) {    //编辑文章接口
        return api.put(urls.putNews + '/' + id, params)
    },

    getNewsInfo(params) {    //查看某一篇文章接口
        return api.get(urls.getNewsInfo + '/' + params)
    },

    postAllNews(params) {   //查看所有文章接口
        return api.post(urls.postAllNews, params)
    }

}