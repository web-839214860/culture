const router = require('koa-router')()
const typeController = require('../../controllers/type')
const passport = require("../../middlewares/passport")

router.prefix('/api')


// router.all('/*',
//     passport.authenticate('jwt', { session: false })
//     , async (ctx, next) => {
//     console.log(ctx.request)
//     await next()
// })


router.get('/getType', typeController.getType)  //获取分类信息


module.exports = router