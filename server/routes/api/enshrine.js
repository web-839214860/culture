const router = require('koa-router')()
const enshrineController = require('../../controllers/enshrine')
const passport = require("../../middlewares/passport")

router.prefix('/api')


// router.all('/*',
//     passport.authenticate('jwt', { session: false })
//     , async (ctx, next) => {
//     console.log(ctx.request)
//     await next()
// })


router.put('/putEnshrine/:id', enshrineController.putEnshrine)  //收藏、取消收藏

router.post('/postAllEnshrine', enshrineController.postAllEnshrine)  //查看所有收藏


module.exports = router