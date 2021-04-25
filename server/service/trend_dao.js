const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
const Op = db.Op
const { trend, user, like, discuss } = require('../modules/index')

trend.sync({ force: false });

class trendDao {

    //增
    static async postTrend(msg) {
        return await trend.create({
            t_content: msg.t_content,
            t_media: msg.t_media,
            t_type: msg.t_type,
            t_like: msg.t_like,
            t_date: msg.t_date,
            u_userId: msg.u_userId
        })
    }

    //删
    static async deleteTrend(id) {
        return await trend.destroy({
            where: {
                t_id: id
            }
        })
    }

    //改
    static async putTrend(msg, id) {
        return await trend.update({
            t_content: msg.t_content,
            t_media: msg.t_media,
            t_type: msg.t_type,
            t_like: msg.t_like,
            t_date: msg.t_date,
            u_userId: msg.u_userId
        }, {
            where: {
                t_id: id
            }
        })
    }

    //查一条
    static async getTrendInfo(id) {
        return await trend.findOne({
            where: {
                t_id: id
            },
            include: [
                { model: user },
                { model: like, include: [{ model: user }] }
            ]
        })
    }

    //查全部(模糊查询)
    static async postAllTrend(msg) {

        const condition = {}
        if (msg.t_type !== '' && msg.t_type !== null && msg.t_type !== undefined) {
            condition.t_type = msg.t_type
        }
        if (msg.t_like !== '' && msg.t_like !== null && msg.t_like !== undefined) {
            condition.t_like = {
                [Op.like]: '%' + msg.t_like + '%',
            }
        }
        if (msg.u_userId !== '' && msg.u_userId !== null && msg.u_userId !== undefined) {
            condition.u_userId = {
                [Op.like]: '%' + msg.u_userId + '%',
            }
        }
        let sort
        if (msg.sort === true) {
            sort = Sequelize.random() //随机排列
        } else {
            sort = [ ['t_date', 'DESC'] ] //根据数据库的字段 t_date 降序排列 相当于数据库的 order by
        }

        return await trend.findAndCountAll({
            order: sort,
            where: condition,
            limit: msg.pageSize || 5,
            offset: (msg.currentPage-1) * msg.pageSize || 0,
            distinct: true, //去重
            include: [
                { model: user },
                { model: like },
                { model: discuss }
            ],
        })
    }
}

module.exports = trendDao