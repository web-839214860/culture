const router = require('koa-router')()
const provinceController = require('../../controllers/province')
const passport = require("../../middlewares/passport")

router.prefix('/api')


// router.all('/*',
//     passport.authenticate('jwt', { session: false })
//     , async (ctx, next) => {
//     console.log(ctx.request)
//     await next()
// })


router.get('/getProvinceInfo/:id', provinceController.getProvinceInfo) //获取省份信息（一个）

router.get('/getProvince', provinceController.getProvince)  //获取省份信息


module.exports = router