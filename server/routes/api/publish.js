const router = require('koa-router')()
const publishController = require('../../controllers/publish')
const passport = require("../../middlewares/passport")

router.prefix('/api')


// router.all('/*',
//     passport.authenticate('jwt', { session: false })
//     , async (ctx, next) => {
//     console.log(ctx.request)
//     await next()
// })


router.post('/postPublish', publishController.postPublish) //添加公布时间

router.get('/getPublish', publishController.getPublish)  //获取公布时间


module.exports = router