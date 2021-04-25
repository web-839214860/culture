const cityDao = require('../service/city_dao')


module.exports = {

    //获取城市信息（一个）
    getCityInfo: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        const cityInfo = await cityDao.getCityInfo(msg);
        
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '城市信息获取成功',
            data: cityInfo
        }
    },

    //获取城市信息
    getCity: async(ctx) => {
        const msg = ctx.params.id;
        const city = await cityDao.getCity(msg);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '城市信息获取成功',
            data: city
        }
    }
}