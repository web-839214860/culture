/*const Sequelize = db.sequelize
const user = Sequelize.import('../modules/user.js')*/

const db = require('../config/mysql_sequelize')
const Op = db.Op
const { user, province, city } = require('../modules/index')

user.sync({ force: false });

class userDao {

    //增
    static async postUser(msg) {
        return await user.findOrCreate({  //先查找，如果不存在则创建并保存到数据库中
            where: {
                u_userId: msg.u_userId
            },
            defaults: {
                u_userId: msg.u_userId,
                u_password: msg.u_password,
                u_name: msg.u_name,
                u_sex: msg.u_sex,
                u_sign: msg.u_sign,
                u_image: msg.u_image,
                u_date: msg.u_date,
                u_star: msg.u_star,
                role: msg.role,
                solt: msg.solt,
                province_id: msg.province_id,
                city_id: msg.city_id
            },
            raw: true   //默认返回ORM对象格式，设置为true时返回json格式
        })
    }

    //删
    static async deleteUser(id) {
        return await user.destroy({
            where: {
                u_userId: id
            }
        })
    }

    //改
    static async putUser(msg, id) {
        return await user.update({
            u_userId: msg.u_userId,
            u_password: msg.u_password,
            u_name: msg.u_name,
            u_sex: msg.u_sex,
            u_sign: msg.u_sign,
            u_image: msg.u_image,
            u_date: msg.u_date,
            u_star: msg.u_star,
            role: msg.role,
            solt: msg.solt,
            province_id: msg.province_id,
            city_id: msg.city_id
        }, {
            where: {
                u_userId: id
            }
        })
    }

    //查一条
    static async getUserInfo(id) {
        return await user.findOne({
            where: {
                u_userId: id
            },
            include: [
                { model: province },
                { model: city }
            ],
        })
    }

    //查全部(模糊查询)
    static async postAllUser(msg) {

        const condition = {}
        if (msg.u_userId !== '' && msg.u_userId !== null && msg.u_userId !== undefined) {
            condition.u_userId = {
                [Op.like]: '%' + msg.u_userId + '%',
            }
        }
        if (msg.u_name !== '' && msg.u_name !== null && msg.u_name !== undefined) {
            condition.u_name = {
                [Op.like]: '%' + msg.u_name + '%',
            }
        }
        if (msg.u_sex !== '' && msg.u_sex !== null && msg.u_sex !== undefined) {
            condition.u_sex = msg.u_sex
        }
        if (msg.u_date !== '' && msg.u_date !== null && msg.u_date !== undefined) {
            condition.u_date = msg.u_date
        }
        if (msg.u_star !== '' && msg.u_star !== null && msg.u_star !== undefined) {
            condition.u_star = {
                [Op.like]: '%' + msg.u_star + '%',
            }
        }
        if (msg.role !== '' && msg.role !== null && msg.role !== undefined) {
            condition.role = msg.role
        }
        if (msg.province_id !== '' && msg.province_id !== null && msg.province_id !== undefined) {
            condition.province_id = msg.province_id
        }
        if (msg.city_id !== '' && msg.city_id !== null && msg.city_id !== undefined) {
            condition.city_id = msg.city_id
        }

        return await user.findAndCountAll({
            'order' :[
                ['u_star' , 'DESC'] //根据数据库的字段 u_star 降序排列 相当于数据库的 order by
            ],
            where: condition,
            limit: msg.pageSize || 5,
            offset: (msg.currentPage-1) * msg.pageSize || 0,
            distinct: true, //去重
            include: [
                { model: province },
                { model: city }
            ]
        })
    }

    //查全部
    static async getAllUser() {
        return await user.findAll({
            'order' :[
                ['role' , 'ASC'] //根据数据库的字段 role 升序排列 相当于数据库的 order by
            ],
            raw: true,    //返回所有数据
            where: {},
            include: [
                { model: province },
                { model: city }
            ]
        })
    }
}

module.exports = userDao