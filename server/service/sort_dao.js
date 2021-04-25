const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
const sort = Sequelize.import('../modules/sort.js')

sort.sync({ force: false });

class sortDao {

    //添加文章类别
    static async postSort(msg) {
        return await sort.findOrCreate({
            where: {
                sort_name: msg.sort_name
            },
            defaults: {
                sort_name: msg.sort_name
            }
        })
    }

    //获取文章类别
    static async getSort() {
        return await sort.findAll({
            'order' :[
                ['sort_id' , 'ASC'] //根据数据库的字段 sort_id 升序排列 相当于数据库的 order by
            ],
            where: {}
        })
    }
}

module.exports = sortDao