const db = require('../config/mysql_sequelize')
const Op = db.Op
const { convention, province, type, publish } = require('../modules/index')

convention.sync({ force: false });

class conventionDao {

    //增
    static async postConvention(msg) {
        return await convention.findOrCreate({
            where: {
                c_name: msg.c_name,
                c_company: msg.c_company,
                c_synopsis: msg.c_synopsis,
                publish_id: msg.publish_id,
                type_id: msg.type_id,
                province_id: msg.province_id
            },
            defaults: {
                c_name: msg.c_name,
                c_company: msg.c_company,
                c_synopsis: msg.c_synopsis,
                publish_id: msg.publish_id,
                type_id: msg.type_id,
                province_id: msg.province_id
            }
        })
    }

    //删
    static async deleteConvention(id) {
        return await convention.destroy({
            where: {
                c_id: id
            }
        })
    }

    //改
    static async putConvention(msg, id) {
        return await convention.update({
            c_name: msg.c_name,
            c_company: msg.c_company,
            c_synopsis: msg.c_synopsis,
            publish_id: msg.publish_id,
            type_id: msg.type_id,
            province_id: msg.province_id
        }, {
            where: {
                c_id: id
            }
        })
    }

    //查一条
    static async getConventionInfo(id) {
        return await convention.findOne({
            where: {
                c_id: id
            },
            include: [
                { model: publish},
                { model: type },
                { model: province }
            ]
        })
    }

    //查全部(模糊查询)
    static async postAllConvention(msg) {

        const condition = {}
        if (msg.c_name !== '' && msg.c_name !== null && msg.c_name !== undefined) {
            condition.c_name = {
                [Op.like]: '%' + msg.c_name + '%',
            }
        }
        if (msg.c_company !== '' && msg.c_company !== null && msg.c_company !== undefined) {
            condition.c_company = {
                [Op.like]: '%' + msg.c_company + '%',
            }
        }
        if (msg.publish_id !== '' && msg.publish_id !== null && msg.publish_id !== undefined) {
            condition.publish_id = msg.publish_id
        }
        if (msg.type_id !== '' && msg.type_id !== null && msg.type_id !== undefined) {
            condition.type_id = msg.type_id
        }
        if (msg.province_id !== '' && msg.province_id !== null && msg.province_id !== undefined) {
            condition.province_id = msg.province_id
        }

        return await convention.findAndCountAll({
            'order' :[
                ['type_id' , 'ASC'] //根据数据库的字段 type_id 升序排列 相当于数据库的 order by
            ],
            where: condition,
            limit: msg.pageSize || 5,
            offset: (msg.currentPage-1) * msg.pageSize || 0,
            distinct: true, //去重
            include: [
                { model: publish},
                { model: type },
                { model: province }
            ]
        })
    }

    //查全部
    static async getAllConvention() {
        return await convention.findAll({
            'order' :[
                ['type_id' , 'ASC'] //根据数据库的字段 type_id 升序排列 相当于数据库的 order by
            ],
            raw: true,    //返回所有数据
            where: {},
            include: [
                { model: publish},
                { model: type },
                { model: province }
            ]
        })
    }
}

module.exports = conventionDao