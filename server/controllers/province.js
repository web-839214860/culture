const provinceDao = require('../service/province_dao')


module.exports = {

    //获取省份信息（一个）
    getProvinceInfo: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        const provinceInfo = await provinceDao.getProvinceInfo(msg);
        
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '省份信息获取成功',
            data: provinceInfo
        }
    },

    //获取省份信息
    getProvince: async(ctx) => {
        const province = await provinceDao.getProvince();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '省份信息获取成功',
            data: province
        }
    }
}