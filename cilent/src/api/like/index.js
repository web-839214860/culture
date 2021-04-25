import api from '../index'
import urls from './urls'
export default {

    putLike(params) {    //点赞、取消点赞接口
        return api.put(urls.putLike, params)
    }

}