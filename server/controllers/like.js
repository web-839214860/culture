const likeDao = require('../service/like_dao')
const trendDao = require('../service/trend_dao')

module.exports = {

    //点赞、取消点赞
    putLike: async(ctx) => {
        const data = ctx.request.body;

        //点赞
        if(data.like === true){

            //修改点赞数
            const trendInfo = await trendDao.getTrendInfo(data.t_id)
            let putTrendLikeInfo = { t_like:  trendInfo.t_like +1 }
            await trendDao.putTrend(putTrendLikeInfo, data.t_id);

            let likeInfo = {
                t_id: data.t_id,
                u_userId: data.u_userId
            };
            const postLikeInfo = await likeDao.postLike(likeInfo)
            // console.log(postLikeInfo)

            if(postLikeInfo[1] === true){
                ctx.status = 200;
                ctx.body = {
                    code: 1,
                    message: '点赞成功'
                }
            } else {
                ctx.status = 200;
                ctx.body = {
                    code: -1,
                    message: '该动态已被您点赞啦!'
                }
            }
            return
        }

        //取消点赞
        if(data.like === false){

            //修改点赞数
            const trendInfo = await trendDao.getTrendInfo(data.t_id)
            let putTrendLikeInfo = { t_like:  trendInfo.t_like -1 }
            await trendDao.putTrend(putTrendLikeInfo, data.t_id);

            const deleteLikeInfo = await likeDao.deleteLike(data.t_id, data.u_userId);
            // console.log(deleteLikeInfo);

            ctx.status = 200;
            ctx.body = {
                code: 1,
                message: '取消点赞成功'
            }
        }
    }
}