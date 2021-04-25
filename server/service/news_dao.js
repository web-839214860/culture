const db = require('../config/mysql_sequelize')
const Op = db.Op
const { news, sort } = require('../modules/index')

news.sync({ force: false });

class newsDao {

    //增
    static async postNews(msg) {
        return await news.findOrCreate({
            where: {
                n_source: msg.n_source,
                n_author: msg.n_author,
                n_title: msg.n_title,
                n_article: msg.n_article
            },
            defaults: {
                n_source: msg.n_source,
                n_author: msg.n_author,
                n_date: msg.n_date,
                n_title: msg.n_title,
                n_article: msg.n_article,
                n_image: msg.n_image,
                n_enshrine: msg.n_enshrine,
                n_view: msg.n_view,
                sort_id: msg.sort_id
            }
        })
    }

    //删
    static async deleteNews(id) {
        return await news.destroy({
            where: {
                n_id: id
            }
        })
    }

    //改
    static async putNews(msg, id) {
        return await news.update({
            n_source: msg.n_source,
            n_author: msg.n_author,
            n_date: msg.n_date,
            n_title: msg.n_title,
            n_article: msg.n_article,
            n_image: msg.n_image,
            n_enshrine: msg.n_enshrine,
            n_view: msg.n_view,
            sort_id: msg.sort_id
        }, {
            where: {
                n_id: id
            }
        })
    }

    //查一条
    static async getNewsInfo(id) {
        return await news.findOne({
            where: {
                n_id: id
            },
            include: [
                { model: sort }
            ]
        })
    }

    //查全部(模糊查询)
    static async postAllNews(msg) {

        const condition = {}
        if (msg.n_source !== '' && msg.n_source !== null && msg.n_source !== undefined) {
            condition.n_source = {
                [Op.like]: '%' + msg.n_source + '%',
            }
        }
        if (msg.n_author !== '' && msg.n_author !== null && msg.n_author !== undefined) {
            condition.n_author = {
                [Op.like]: '%' + msg.n_author + '%',
            }
        }
        if (msg.n_title !== '' && msg.n_title !== null && msg.n_title !== undefined) {
            condition.n_title = {
                [Op.like]: '%' + msg.n_title + '%',
            }
        }
        if (msg.sort_id !== '' && msg.sort_id !== null && msg.sort_id !== undefined) {
            condition.sort_id = msg.sort_id
        }
        let reorder
        if (msg.reorder === '1') {
            reorder = [ ['n_enshrine', 'DESC'] ] //根据数据库的字段 n_enshrine 降序排列 相当于数据库的 order by
        } else if(msg.reorder === '2') {
            reorder = [ ['n_view', 'DESC'] ] //根据数据库的字段 n_view 降序排列 相当于数据库的 order by
        } else {
            reorder = [ ['n_date', 'DESC'] ] //根据数据库的字段 n_date 降序排列 相当于数据库的 order by
        }     

        return await news.findAndCountAll({
            order: reorder,
            where: condition,
            limit: msg.pageSize || 5,
            offset: (msg.currentPage-1) * msg.pageSize || 0,
            distinct: true, //去重
            include: [
                { model: sort }
            ]
        })
    }
}

module.exports = newsDao