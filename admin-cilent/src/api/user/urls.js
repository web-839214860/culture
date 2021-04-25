const baseUrl = '/api'
export default {

    postLogin: baseUrl + '/postLogin',  //登录接口

    postUser: baseUrl + '/postUser',    //注册、添加用户接口

    deleteUser: baseUrl + '/deleteUser',    //删除用户接口

    putPassword: baseUrl + '/putPassword',  //修改密码接口

    putUser: baseUrl + '/putUser',  //编辑用户信息接口

    getUserInfo: baseUrl + '/getUserInfo',  //查看单个用户接口

    postAllUser: baseUrl + '/postAllUser',  //查看所有用户接口

    userInfo: baseUrl + '/userInfo', //查看个人信息接口

    getAllUser: baseUrl + '/getAllUser'  //下载所有用户接口

}