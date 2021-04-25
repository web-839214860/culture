const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const path = require('path')
const static = require('koa-static')


const cors = require('./config/cors_config')
const passport=require('./middlewares/passport')
const log4js = require('./middlewares/log4')

const index = require('./routes/index')
const api_users = require('./routes/api/user')
const api_provinces = require('./routes/api/province')
const api_citys = require('./routes/api/city')
const api_types = require('./routes/api/type')
const api_publishs = require('./routes/api/publish')
const api_sorts = require('./routes/api/sort')
const api_conventions = require('./routes/api/convention')
const api_datas = require('./routes/api/data')
const api_newss = require('./routes/api/news')
const api_enshrines = require('./routes/api/enshrine')
const api_trends = require('./routes/api/trend')
const api_likes = require('./routes/api/like')
const api_discusss = require('./routes/api/discuss')


// 上传图片
app.use(static(
  path.join(__dirname, './public/images')//获取static文件夹下的资源
))

// error handler
onerror(app)

app.keys = ['this is my secret set'];

app.use(session({
  key: 'koa:sess', /** cookie的名称，可以不管 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
},app));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text'],
  extended:false
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(cors)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  log4js.resLogger(ctx,ms)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(api_users.routes(), api_users.allowedMethods())
app.use(api_provinces.routes(), api_provinces.allowedMethods())
app.use(api_citys.routes(), api_citys.allowedMethods())
app.use(api_types.routes(), api_types.allowedMethods())
app.use(api_publishs.routes(), api_publishs.allowedMethods())
app.use(api_sorts.routes(), api_sorts.allowedMethods())
app.use(api_conventions.routes(), api_conventions.allowedMethods())
app.use(api_datas.routes(), api_datas.allowedMethods())
app.use(api_newss.routes(), api_newss.allowedMethods())
app.use(api_enshrines.routes(), api_enshrines.allowedMethods())
app.use(api_trends.routes(), api_trends.allowedMethods())
app.use(api_likes.routes(), api_likes.allowedMethods())
app.use(api_discusss.routes(), api_discusss.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
  log4js.errLogger(ctx, err)
});

module.exports = app