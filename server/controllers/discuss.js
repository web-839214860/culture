const discussDao = require('../service/discuss_dao')
var moment = require('moment')

module.exports = {


    // 发表评论
    postDiscuss: async(ctx) => {
        const data = ctx.request.body
        const msg = {};

        msg.d_content = data.d_content;
        msg.d_date = moment().format('YYYY-MM-DD HH:mm:ss');
        msg.t_id = data.t_id;
        msg.u_userId = data.u_userId;

        await discussDao.postDiscuss(msg)
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '发表评论成功'
        }
    },

    // 删除评论
    deleteDiscuss: async(ctx) => {
        const msg = ctx.params.id;
        const deleteDiscussInfo = await discussDao.deleteDiscuss(msg);
        // console.log(deleteDiscussInfo);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '删除成功'
        }
    },

    // 获取所有评论
    postAllDiscuss: async(ctx) => {
        const data = ctx.request.body;
        const allDiscuss = await discussDao.postAllDiscuss(data);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '获取评论成功',
            data: {
                discussList: allDiscuss.rows,
                total: allDiscuss.count
            }
        }
    }
}