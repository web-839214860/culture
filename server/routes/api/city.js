const router = require('koa-router')()
const cityController = require('../../controllers/city')
const passport = require("../../middlewares/passport")

router.prefix('/api')


// router.all('/*',
//     passport.authenticate('jwt', { session: false })
//     , async (ctx, next) => {
//     console.log(ctx.request)
//     await next()
// })


router.get('/getCityInfo/:id', cityController.getCityInfo) //获取城市信息（一个）

router.get('/getCity/:id', cityController.getCity)  //获取城市信息


module.exports = router