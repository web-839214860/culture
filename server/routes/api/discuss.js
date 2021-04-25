const router = require('koa-router')()
const discussController = require('../../controllers/discuss')
const passport = require("../../middlewares/passport")

router.prefix('/api')


// router.all('/*',
//     passport.authenticate('jwt', { session: false })
//     , async (ctx, next) => {
//     console.log(ctx.request)
//     await next()
// })


router.post('/postDiscuss', discussController.postDiscuss) // 发表评论

router.delete('/deleteDiscuss/:id', discussController.deleteDiscuss) // 删除评论

router.post('/postAllDiscuss', discussController.postAllDiscuss) // 获取所有评论


module.exports = router