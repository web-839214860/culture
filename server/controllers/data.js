const provinceDao = require('../service/province_dao')
const typeDao = require('../service/type_dao')
const conventionDao = require('../service/convention_dao')


module.exports = {

    //获取省份总数
    getProvinceNum: async(ctx) => {
        let province = await provinceDao.getProvince();

        const msg = {}
        const numArr = []
        for (let i = 1; i <= province.length; i++) {
            msg.province_id = i;
            const conventionInfo = await conventionDao.postAllConvention(msg);
            const provinceNum = conventionInfo.count;
            numArr.push(provinceNum)
        }

        province = province.map((item, index) => {
            item.num = numArr[index]
            return item
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '省份总数获取成功',
            data: province
        }
    },

    //获取分类总数
    getTypeNum: async(ctx) => {
        let type = await typeDao.getType();

        const msg = {}
        const numArr = []
        for (let i = 1; i <= type.length; i++) {
            msg.type_id = i;
            const conventionInfo = await conventionDao.postAllConvention(msg);
            const typeNum = conventionInfo.count;
            numArr.push(typeNum)
        }
        
        type = type.map((item, index) => {
            item.num = numArr[index]
            return item
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '分类总数获取成功',
            data: type
        }
    },

    //获取省份分类总数
    getProvinceTypeNum: async(ctx) => {
        const provinceId = ctx.params.id;
        let type = await typeDao.getType();

        const msg = {}
        msg.province_id = provinceId
        const numArr = []
        for (let i = 1; i <= type.length; i++) {
            msg.type_id = i;
            const conventionInfo = await conventionDao.postAllConvention(msg);
            const typeNum = conventionInfo.count;
            numArr.push(typeNum)
        }
        
        type = type.map((item, index) => {
            item.num = numArr[index]
            return item
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '省份分类总数获取成功',
            data: type
        }
    }
}