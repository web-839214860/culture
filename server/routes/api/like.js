const router = require('koa-router')()
const likeController = require('../../controllers/like')
const passport = require("../../middlewares/passport")

router.prefix('/api')


// router.all('/*',
//     passport.authenticate('jwt', { session: false })
//     , async (ctx, next) => {
//     console.log(ctx.request)
//     await next()
// })


router.put('/putLike', likeController.putLike)  //点赞、取消点赞


module.exports = router