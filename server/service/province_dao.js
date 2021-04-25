const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
const province = Sequelize.import('../modules/province.js')

province.sync({ force: false });

class provinceDao {

    //获取省份信息（一个）
    static async getProvinceInfo(id) {
        return await province.findOne({
            where: {
                province_id: id
            }
        })
    }

    //获取省份信息
    static async getProvince() {
        return await province.findAll({
            'order' :[
                ['province_id' , 'ASC'] //根据数据库的字段 province_id 升序排列 相当于数据库的 order by
            ],
            where: {},
            raw: true
        })
    }
}

module.exports = provinceDao