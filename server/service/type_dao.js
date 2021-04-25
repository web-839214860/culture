const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
const type = Sequelize.import('../modules/type.js')

type.sync({ force: false });

class typeDao {

    //获取分类信息
    static async getType() {
        return await type.findAll({
            'order' :[
                ['type_id' , 'ASC'] //根据数据库的字段 type_id 升序排列 相当于数据库的 order by
            ],
            where: {},
            raw: true
        })
    }
}

module.exports = typeDao