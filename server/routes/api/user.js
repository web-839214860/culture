const router = require('koa-router')()
const userController = require('../../controllers/user')
const passport = require("../../middlewares/passport")
const upload = require("../../middlewares/multer")

router.prefix('/api')


router.post('/postLogin', userController.postLogin)//登录

router.post('/postUser', upload.single('u_image'), userController.postUser) //注册、添加用户


router.all('/*',
    passport.authenticate('jwt', { session: false })
    , async (ctx, next) => {
    console.log(ctx.request)
    await next()
})


router.delete('/deleteUser/:id', userController.deleteUser) //删除用户

router.put('/putPassword',userController.putPassword) //修改密码

router.put('/putUser/:id', upload.single('u_image'), userController.putUser) //编辑用户信息

router.get('/getUserInfo/:id', userController.getUserInfo) //查看单个用户

router.post('/postAllUser', userController.postAllUser) //查看所有用户

router.get('/userInfo', userController.userInfo) //查看个人信息

router.get('/getAllUser', userController.getAllUser) //下载所有用户


module.exports = router