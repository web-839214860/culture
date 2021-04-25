const db = require('../config/mysql_sequelize')
const Op = db.Op
const { discuss, user } = require('../modules/index')

discuss.sync({ force: false });

class discussDao {

    //增
    static async postDiscuss(msg) {
        return await discuss.create({
            d_content: msg.d_content,
            d_date: msg.d_date,
            t_id: msg.t_id,
            u_userId: msg.u_userId
        })
    }

    //删
    static async deleteDiscuss(id) {
        return await discuss.destroy({
            where: {
                d_id: id
            }
        })
    }
    static async deleteTrendDiscuss(id) {
        return await discuss.destroy({
            where: {
                t_id: id
            }
        })
    }

    //查全部(模糊查询)
    static async postAllDiscuss(msg) {

        const condition = {}
        if (msg.u_userId !== '' && msg.u_userId !== null && msg.u_userId !== undefined) {
            condition.u_userId = {
                [Op.like]: '%' + msg.u_userId + '%',
            }
        }
        if (msg.t_id !== '' && msg.t_id !== null && msg.t_id !== undefined) {
            condition.t_id = msg.t_id
        }

        return await discuss.findAndCountAll({
            'order' :[
                ['d_date' , 'DESC'] //根据数据库的字段 d_date 降序排列 相当于数据库的 order by
            ],
            where: condition,
            limit: msg.pageSize || 5,
            offset: (msg.currentPage-1) * msg.pageSize || 0,
            distinct: true, //去重
            include:[
                { model: user }
            ],
        })
    }

}

module.exports = discussDao