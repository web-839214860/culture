const publishDao = require('../service/publish_dao')


module.exports = {

    //添加公布时间
    postPublish: async(ctx) => {
        const data = ctx.request.body;

        const msg = {};
        msg.publish_date = data.publish_date;

        const postPublishInfo = await publishDao.postPublish(msg)
        // console.log(postPublishInfo)
        if(postPublishInfo[1] === true){
            ctx.status = 200;
            ctx.body = {
                code: 1,
                message: '添加时间成功'
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: '该时间已经存在,请勿重复添加!'
            }
        }
    },

    //获取公布时间
    getPublish: async(ctx) => {
        const publish = await publishDao.getPublish();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '公布时间获取成功',
            data: publish
        }
    }
}