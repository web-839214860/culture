const db = require('../config/mysql_sequelize')
const { like } = require('../modules/index')

like.sync({ force: false });

class likeDao {

    //增
    static async postLike(msg) {
        return await like.findOrCreate({
            where: {
                t_id: msg.t_id,
                u_userId: msg.u_userId
            },
            defaults: {
                t_id: msg.t_id,
                u_userId: msg.u_userId
            }
        })
    }

    //删
    static async deleteLike(tid, uid) {
        return await like.destroy({
            where: {
                t_id: tid,
                u_userId: uid
            }
        })
    }
    static async deleteTrendLike(id) {
        return await like.destroy({
            where: {
                t_id: id
            }
        })
    }
}

module.exports = likeDao