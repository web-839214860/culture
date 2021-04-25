const userDao = require('../service/user_dao')
const md5 = require('../middlewares/tools')
const passport = require('../middlewares/passport')
const jwt = require('jsonwebtoken');
const uuid = require('../node_modules/uuid')
var moment = require('moment')


module.exports = {

    //登录
    postLogin: async (ctx) => {
        const data = ctx.request.body
        const user = await userDao.getUserInfo(data.u_userId) // 查询用户,判断用户是否存在

        if (!user) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: '用户暂未注册,请先前往注册'
            };
            return;
        }

        //验证密码
        let md5pass = await md5.MD5(data.u_password, user.solt)
        if (md5pass === user.u_password) {

            if(data.role === user.role){
                const payload = {
                    u_userId: user.u_userId,
                    u_name: user.u_name
                };
                //生成token
                const token = jwt.sign(payload, "gamercode", {
                    expiresIn: 3600
                });
                console.log("生成token：" + token)
                ctx.status = 200;
                ctx.body = {
                    code: 1,
                    message: '登录成功',
                    data: {
                        token: 'Bearer ' + token
                    }
                }
            } else {
                ctx.status = 200;
                ctx.body = {
                    code: 0,
                    message: '当前账号没有权限访问',
                }
            }

        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: '请输入正确的密码'
            };
        }
    },

    //注册、添加用户
    postUser: async(ctx) => {
        const data = ctx.req.body;
        const image = ctx.req.file; //接收图片
        // console.log(data);
        // console.log(image);
        const msg = {};
        const user = await userDao.getUserInfo(data.u_userId) // 查询用户账号是否已经注册过

        if(user === null){
            let solt = uuid.v4();
            let password = data.u_password;
            let md5Pass = await md5.MD5(password, solt);

            let uImage = "noAvatar.jpg"
            let provinceId = null
            let cityId = null
            if (image !== '' && image !== null && image !== undefined) {
                uImage = image.filename
            }
            if (data.province_id !== '' && data.province_id !== null && data.province_id !== undefined) {
                provinceId = data.province_id
            }
            if (data.city_id !== '' && data.city_id !== null && data.city_id !== undefined) {
                cityId = data.city_id
            }

            msg.u_userId = data.u_userId;
            msg.u_password = md5Pass;
            msg.u_name = data.u_name;
            msg.u_sex = data.u_sex;
            msg.u_sign = data.u_sign;
            msg.u_image = uImage;
            msg.u_date = moment().format('YYYY-MM-DD');
            msg.u_star = 0;
            msg.role = data.role;
            msg.solt = solt;
            msg.province_id = provinceId;
            msg.city_id = cityId;

            await userDao.postUser(msg)
            ctx.status = 200;
            ctx.body = {
                code: 1,
                message: '账号注册成功'
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: '该账号已被注册,请勿重复注册!'
            }
        }
    },

    //删除用户
    deleteUser: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        const deleteUserInfo = await userDao.deleteUser(msg);
        //console.log(deleteUserInfo);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '用户删除成功'
        }
    },

    //修改密码
    putPassword: async(ctx) => {
        const data = ctx.request.body
        const msg = {}
        const user = await userDao.getUserInfo(data.u_userId)

        //新旧密码加密
        let md5pass = await md5.MD5(data.old_password, user.solt) //验证旧密码，盐值用原来的盐值
        let solt = uuid.v4();
        let newMd5Pass = await md5.MD5(data.new_password, solt);

        if (md5pass === user.u_password) {
            //修改为新密码
            msg.solt = solt;
            msg.u_password = newMd5Pass;
            await userDao.putUser(msg, data.u_userId)

            ctx.status = 200;
            ctx.body = {
                code: 1,
                message: '修改密码成功,请重新登录'
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: '修改错误,请确认是否输对原始密码'
            };
        }
    },

    //编辑用户信息
    putUser: async(ctx) => {
        const msg = ctx.params.id;
        const data = ctx.req.body;
        const image = ctx.req.file; //接收图片

        let provinceId = null
        let cityId = null
        let uImage = data.u_image
        if (data.province_id !== '' && data.province_id !== null && data.province_id !== undefined && data.province_id !== "null") {
            provinceId = data.province_id
        }
        if (data.city_id !== '' && data.city_id !== null && data.city_id !== undefined && data.city_id !== "null") {
            cityId = data.city_id
        }
        if (image !== '' && image !== null && image !== undefined) {
            uImage = image.filename
        }

        let putUserInfo = {
            u_name: data.u_name,
            u_sex: data.u_sex,
            u_sign: data.u_sign,
            u_star: data.u_star,
            role: data.role,
            province_id: provinceId,
            city_id: cityId,
            u_image: uImage
        }

        await userDao.putUser(putUserInfo, msg);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '修改成功',
        }
    },

    //查看单个用户
    getUserInfo: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        const userInfo = await userDao.getUserInfo(msg);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '获取用户信息',
            data: userInfo
        }
    },

    //查看所有用户
    postAllUser: async(ctx) => {
        const data = ctx.request.body;
        const allUserInfo = await userDao.postAllUser(data);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '获取所有用户信息',
            data: {
                userList: allUserInfo.rows,
                total: allUserInfo.count
            }
        }
    },

    //查看个人信息
    userInfo: async (ctx) => {
        // console.log(ctx.state.user)
        const user = ctx.state.user;
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '获取个人信息',
            data: user
        };
    },

    //下载所有用户
    getAllUser: async(ctx) => {
        const allUser = await userDao.getAllUser();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '下载所有用户',
            data: allUser
        }
    }

}