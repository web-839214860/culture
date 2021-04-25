const db = require('../config/mysql_sequelize')
const Op = db.Op
const { enshrine, news, sort } = require('../modules/index')

enshrine.sync({ force: false });

class enshrineDao {

    //增
    static async postEnshrine(msg) {
        return await enshrine.findOrCreate({
            where: {
                n_id: msg.n_id,
                u_userId: msg.u_userId
            },
            defaults: {
                n_id: msg.n_id,
                u_userId: msg.u_userId
            }
        })
    }

    //删
    static async deleteEnshrine(id) {
        return await enshrine.destroy({
            where: {
                e_id: id
            }
        })
    }
    static async deleteNewsEnshrine(id) {
        return await enshrine.destroy({
            where: {
                n_id: id
            }
        })
    }

    //查
    static async postAllEnshrine(msg) {

        const condition = {}
        if (msg.n_id !== '' && msg.n_id !== null && msg.n_id !== undefined) {
            condition.n_id = msg.n_id
        }
        if (msg.u_userId !== '' && msg.u_userId !== null && msg.u_userId !== undefined) {
            condition.u_userId = msg.u_userId
        } 

        return await enshrine.findAndCountAll({
            'order' :[
                ['e_id' , 'DESC'] //根据数据库的字段 e_id 降序排列 相当于数据库的 order by
            ],
            where: condition,
            limit: msg.pageSize || 5,
            offset: (msg.currentPage-1) * msg.pageSize || 0,
            distinct: true, //去重
            include: [
                { model: news, include: [{ model: sort }] }
            ]
        })
    }
}

module.exports = enshrineDao