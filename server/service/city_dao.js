const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
const city = Sequelize.import('../modules/city.js')

city.sync({ force: false });

class cityDao {

    //获取城市信息（一个）
    static async getCityInfo(id) {
        return await city.findOne({
            where: {
                city_id: id
            }
        })
    }

    //获取城市信息
    static async getCity(id) {
        return await city.findAll({
            'order' :[
                ['city_id' , 'ASC'] //根据数据库的字段 city_id 升序排列 相当于数据库的 order by
            ],
            where: {
                province_id: id
            }
        })
    }
}

module.exports = cityDao