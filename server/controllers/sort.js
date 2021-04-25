const sortDao = require('../service/sort_dao')


module.exports = {

    //添加文章类别
    postSort: async(ctx) => {
        const data = ctx.request.body;

        const msg = {};
        msg.sort_name = data.sort_name;

        const postSortInfo = await sortDao.postSort(msg)
        // console.log(postSortInfo)
        if(postSortInfo[1] === true){
            ctx.status = 200;
            ctx.body = {
                code: 1,
                message: '添加栏目成功'
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: '该栏目已经存在,请勿重复添加!'
            }
        }
    },

    //获取文章类别
    getSort: async(ctx) => {
        const sort = await sortDao.getSort();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '文章类别获取成功',
            data: sort
        }
    }
}