const baseUrl = '/api'
export default {

    postNews: baseUrl + '/postNews',  //添加文章接口

    deleteNews: baseUrl + '/deleteNews',  //删除文章接口

    putNews: baseUrl + '/putNews',  //编辑文章接口

    getNewsInfo: baseUrl + '/getNewsInfo', //查看某一篇文章接口

    postAllNews: baseUrl + '/postAllNews' //查看所有文章接口

}