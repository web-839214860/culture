const router = require('koa-router')()
const sortController = require('../../controllers/sort')
const passport = require("../../middlewares/passport")

router.prefix('/api')


// router.all('/*',
//     passport.authenticate('jwt', { session: false })
//     , async (ctx, next) => {
//     console.log(ctx.request)
//     await next()
// })


router.post('/postSort', sortController.postSort) //添加文章分类

router.get('/getSort', sortController.getSort)  //获取文章分类


module.exports = router