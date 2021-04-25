const router = require('koa-router')()
const NewsController = require('../../controllers/news')
const passport = require("../../middlewares/passport")
const upload = require("../../middlewares/multer")

router.prefix('/api')


// router.all('/*',
//     passport.authenticate('jwt', { session: false })
//     , async (ctx, next) => {
//     console.log(ctx.request)
//     await next()
// })


router.post('/postNews', upload.single('n_image'), NewsController.postNews) //添加文章

router.delete('/deleteNews/:id', NewsController.deleteNews) //删除文章

router.put('/putNews/:id', upload.single('n_image'), NewsController.putNews) //编辑文章

router.put('/putNewsView/:id', NewsController.putNewsView) //修改阅读量

router.get('/getNewsInfo/:id', NewsController.getNewsInfo) //查看某一篇文章

router.post('/postAllNews', NewsController.postAllNews) //查看所有文章

router.post('/upload', upload.single('file'), NewsController.upload) //上传文章图片


module.exports = router