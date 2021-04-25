const trendDao = require('../service/trend_dao')
const likeDao = require('../service/like_dao')
const discussDao = require('../service/discuss_dao')
var moment = require('moment')


module.exports = {

    //发布动态
    postTrend: async(ctx) => {
        const data = ctx.req.body
        const media = ctx.req.file //接收媒体
        const msg = {}

        msg.t_content = data.t_content;
        if(media !== '' && media !== null && media !== undefined){
            msg.t_media = media.filename;

            const type = (media.mimetype).split("/")
            if(type[0] === 'image'){
                msg.t_type = 1
            } else if(type[0] === 'video') {
                msg.t_type = 2
            } else {
                msg.t_type = 3
            }

        } else {
            msg.t_media = null
            msg.t_type = null
        }
        msg.t_like = 0;
        msg.t_date = moment().format('YYYY-MM-DD HH:mm:ss');
        msg.u_userId = data.u_userId;

        await trendDao.postTrend(msg)
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '动态发布成功'
        }
    },

    //删除动态
    deleteTrend: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        const deleteTrendLikeInfo = await likeDao.deleteTrendLike(msg);
        const deleteTrendDiscussInfo = await discussDao.deleteTrendDiscuss(msg);
        const deleteTrendInfo = await trendDao.deleteTrend(msg);
        //console.log(deleteTrendLikeInfo);
        //console.log(deleteTrendDiscussInfo);
        //console.log(deleteTrendInfo);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '动态删除成功'
        }
    },

    //查看某一条动态
    getTrendInfo: async(ctx) => {
        const msg = ctx.params.id;
        // console.log(msg);
        const trendInfo = await trendDao.getTrendInfo(msg);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '动态获取成功',
            data: trendInfo
        }
    },

    //查看所有动态
    postAllTrend: async(ctx) => {
        const data = ctx.request.body;
        const allTrendInfo = await trendDao.postAllTrend(data);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '获取所有动态信息',
            data: {
                trendList: allTrendInfo.rows,
                total: allTrendInfo.count
            }
        }
    }

}