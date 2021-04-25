const router = require('koa-router')()
const trendController = require('../../controllers/trend')
const passport = require("../../middlewares/passport")
const upload = require("../../middlewares/multer")

router.prefix('/api')


// router.all('/*',
//     passport.authenticate('jwt', { session: false })
//     , async (ctx, next) => {
//     console.log(ctx.request)
//     await next()
// })


router.post('/postTrend', upload.single('t_media'), trendController.postTrend) //发布动态

router.delete('/deleteTrend/:id', trendController.deleteTrend) //删除动态

router.get('/getTrendInfo/:id', trendController.getTrendInfo) //查看某一条动态

router.post('/postAllTrend', trendController.postAllTrend) //查看所有动态


module.exports = router