const router = require('koa-router')()
const dataController = require('../../controllers/data')
const passport = require("../../middlewares/passport")

router.prefix('/api')


// router.all('/*',
//     passport.authenticate('jwt', { session: false })
//     , async (ctx, next) => {
//     console.log(ctx.request)
//     await next()
// })


router.get('/getProvinceNum', dataController.getProvinceNum)  //获取省份总数

router.get('/getTypeNum', dataController.getTypeNum)  //获取分类总数

router.get('/getProvinceTypeNum/:id', dataController.getProvinceTypeNum)  //获取省份分类总数


module.exports = router