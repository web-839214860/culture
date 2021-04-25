const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
const publish = Sequelize.import('../modules/publish.js')

publish.sync({ force: false });

class publishDao {

    //添加公布时间
    static async postPublish(msg) {
        return await publish.findOrCreate({
            where: {
                publish_date: msg.publish_date
            },
            defaults: {
                publish_date: msg.publish_date
            }
        })
    }

    //获取公布时间
    static async getPublish() {
        return await publish.findAll({
            'order' :[
                ['publish_id' , 'ASC'] //根据数据库的字段 publish_id 升序排列 相当于数据库的 order by
            ],
            where: {}
        })
    }
}

module.exports = publishDao