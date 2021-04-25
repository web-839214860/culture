const enshrineDao = require('../service/enshrine_dao')
const newsDao = require('../service/news_dao')

module.exports = {

    //收藏、取消收藏
    putEnshrine: async(ctx) => {
        const msg = ctx.params.id;
        const data = ctx.request.body;

        //收藏
        if(data.enshrine === true){

            //修改收藏量
            const newsInfo = await newsDao.getNewsInfo(data.n_id)
            let putNewsEnshrineInfo = { n_enshrine:  newsInfo.n_enshrine +1 }
            await newsDao.putNews(putNewsEnshrineInfo, data.n_id);

            let enshrineInfo = {
                n_id: data.n_id,
                u_userId: data.u_userId
            };
            const postEnshrineInfo = await enshrineDao.postEnshrine(enshrineInfo)
            // console.log(postEnshrineInfo)

            if(postEnshrineInfo[1] === true){
                ctx.status = 200;
                ctx.body = {
                    code: 1,
                    message: '收藏成功'
                }
            } else {
                ctx.status = 200;
                ctx.body = {
                    code: -1,
                    message: '该文章已被您收藏啦!'
                }
            }
            return
        }

        //取消收藏
        if(data.enshrine === false){

            //修改收藏量
            const newsInfo = await newsDao.getNewsInfo(data.n_id)
            let putNewsEnshrineInfo = { n_enshrine:  newsInfo.n_enshrine -1 }
            await newsDao.putNews(putNewsEnshrineInfo, data.n_id);

            const deleteEnshrineInfo = await enshrineDao.deleteEnshrine(msg);
            // console.log(deleteEnshrineInfo);

            ctx.status = 200;
            ctx.body = {
                code: 1,
                message: '取消收藏成功'
            }
        }
    },

    //查看所有收藏
    postAllEnshrine: async(ctx) => {
        const data = ctx.request.body;
        const allEnshrineInfo = await enshrineDao.postAllEnshrine(data);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '获取所有收藏',
            data: {
                enshrineList: allEnshrineInfo.rows,
                total: allEnshrineInfo.count
            }
        }
    }
}