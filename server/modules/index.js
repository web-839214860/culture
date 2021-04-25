const config=require('../config/mysql_sequelize');
const Sequelize = config.sequelize

//导入模型统一管理
const user = Sequelize.import(__dirname + '/user.js')
const province = Sequelize.import(__dirname+'/province.js')
const city = Sequelize.import(__dirname+'/city.js')
const trend = Sequelize.import(__dirname+'/trend.js')
const like = Sequelize.import(__dirname+'/like.js')
const discuss = Sequelize.import(__dirname+'/discuss.js')
const type = Sequelize.import(__dirname+'/type.js')
const publish = Sequelize.import(__dirname+'/publish.js')
const convention = Sequelize.import(__dirname+'/convention.js')
const sort = Sequelize.import(__dirname+'/sort.js')
const enshrine = Sequelize.import(__dirname+'/enshrine.js')
const news = Sequelize.import(__dirname+'/news.js')

// 表关联：https://www.cnblogs.com/cangqinglang/p/12159490.html

// 用户表、省份表、城市表（一对一）
user.belongsTo(province, {
    foreignKey: 'province_id',
    targetKey: 'province_id'
})
// province.hasOne(user, {
//     foreignKey: 'province_id'
// })
user.belongsTo(city, {
    foreignKey: 'city_id',
    targetKey: 'city_id'
})


// 用户表、动态表、评论表（一对一、一对多）
trend.belongsTo(user, {
    foreignKey: 'u_userId',
    targetKey: 'u_userId'
})
discuss.belongsTo(user, {
    foreignKey: 'u_userId',
    targetKey: 'u_userId'
})
trend.hasMany(discuss, {
    foreignKey: 't_id',
    sourceKey: 't_id'
})


// 省份表、分类表、时间表、非遗表
convention.belongsTo(province, {
    foreignKey: 'province_id',
    targetKey: 'province_id'
})
convention.belongsTo(type, {
    foreignKey: 'type_id',
    targetKey: 'type_id'
})
convention.belongsTo(publish, {
    foreignKey: 'publish_id',
    targetKey: 'publish_id'
})


// 类别表、收藏表、资讯表
news.belongsTo(sort, {
    foreignKey: 'sort_id',
    targetKey: 'sort_id'
})
enshrine.belongsTo(news, {
    foreignKey: 'n_id',
    targetKey: 'n_id'
})


// 动态表、点赞表、用户表
trend.hasMany(like, {
    foreignKey: 't_id',
    sourceKey: 't_id'
})
like.belongsTo(user, {
    foreignKey: 'u_userId',
    targetKey: 'u_userId'
})

module.exports={ user, province, city, trend, like, discuss, type, publish, convention, sort, enshrine, news }