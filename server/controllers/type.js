const typeDao = require('../service/type_dao')


module.exports = {

    //获取分类信息
    getType: async(ctx) => {
        const type = await typeDao.getType();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '分类信息获取成功',
            data: type
        }
    }
}