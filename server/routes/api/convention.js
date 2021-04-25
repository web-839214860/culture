const router = require('koa-router')()
const conventionController = require('../../controllers/convention')
const passport = require("../../middlewares/passport")

router.prefix('/api')


// router.all('/*',
//     passport.authenticate('jwt', { session: false })
//     , async (ctx, next) => {
//     console.log(ctx.request)
//     await next()
// })


router.post('/postConvention', conventionController.postConvention) //添加非遗数据

router.delete('/deleteConvention/:id', conventionController.deleteConvention) //删除非遗数据

router.put('/putConvention/:id', conventionController.putConvention) //编辑非遗数据

router.get('/getConventionInfo/:id', conventionController.getConventionInfo) //查看某一条非遗信息

router.post('/postAllConvention', conventionController.postAllConvention) //查看所有非遗数据

router.get('/getAllConvention', conventionController.getAllConvention) //下载所有非遗数据


module.exports = router