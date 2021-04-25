const newsDao = require('../service/news_dao')
const enshrineDao = require('../service/enshrine_dao')
var moment = require('moment')

module.exports = {

    //添加文章
    postNews: async(ctx) => {
        const data = ctx.req.body
        const image = ctx.req.file //接收图片
        const msg = {}

        msg.n_source = data.n_source,
        msg.n_author = data.n_author,
        msg.n_date = moment().format('YYYY-MM-DD HH:mm:ss');
        msg.n_title = data.n_title,
        msg.n_article = data.n_article,
        msg.n_enshrine = 0,
        msg.n_view = 0,
        msg.sort_id = data.sort_id
        if (image !== '' && image !== null && image !== undefined) {
            msg.n_image = image.filename
        } else {
            msg.n_image = null
        }

        const postNewsInfo = await newsDao.postNews(msg)
        // console.log(postNewsInfo)
        
        if(postNewsInfo[1] === true){
            ctx.status = 200;
            ctx.body = {
                code: 1,
                message: '添加成功'
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: '该文章已经存在,请勿重复添加!'
            }
        }
    },

    //删除文章
    deleteNews: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        const deleteNewsEnshrineInfo = await enshrineDao.deleteNewsEnshrine(msg);
        const deleteNewsInfo = await newsDao.deleteNews(msg);
        //console.log(deleteNewsEnshrineInfo);
        //console.log(deleteNewsInfo);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '删除成功'
        }
    },

    //编辑文章
    putNews: async(ctx) => {
        const msg = ctx.params.id;
        const data = ctx.req.body;
        const image = ctx.req.file; //接收图片

        let nImage = data.n_image
        if (image !== '' && image !== null && image !== undefined) {
            nImage = image.filename
        } else if(nImage === 'null'){
            nImage = null
        }

        let putNewsInfo = {
            n_source: data.n_source,
            n_author: data.n_author,
            n_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            n_title: data.n_title,
            n_article: data.n_article,
            n_image: nImage,
            sort_id: data.sort_id
        }
        await newsDao.putNews(putNewsInfo, msg);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '修改成功',
        }
    },

    //修改阅读量
    putNewsView: async(ctx) => {
        const msg = ctx.params.id;
        const newsViewInfo = await newsDao.getNewsInfo(msg);

        let putNewsViewInfo = { n_view:  newsViewInfo.n_view +1 }
        await newsDao.putNews(putNewsViewInfo, msg);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '阅读量修改成功',
        }
    },

    //查看某一篇文章
    getNewsInfo: async(ctx) => {
        const msg = ctx.params.id;
        // console.log(msg);
        const newsInfo = await newsDao.getNewsInfo(msg);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '文章获取成功',
            data: newsInfo
        }
    },

    //查看所有文章
    postAllNews: async(ctx) => {
        const data = ctx.request.body;
        const allNewsInfo = await newsDao.postAllNews(data);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '获取所有文章',
            data: {
                newsList: allNewsInfo.rows,
                total: allNewsInfo.count
            }
        }
    },

    //上传文章图片
    upload: async(ctx) => {
        const image = ctx.req.file; //接收图片

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '图片上传成功',
            data: image.filename
        }
    }

}