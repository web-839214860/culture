const baseUrl = '/api'
export default {

    postConvention: baseUrl + '/postConvention',  //添加非遗数据接口

    deleteConvention: baseUrl + '/deleteConvention',  //删除非遗数据接口

    putConvention: baseUrl + '/putConvention',  //编辑非遗数据接口

    getConventionInfo: baseUrl + '/getConventionInfo', //查看某一条非遗信息接口
    
    postAllConvention: baseUrl + '/postAllConvention', //查看所有非遗数据接口

    getAllConvention: baseUrl + '/getAllConvention', //下载所有非遗数据接口

}