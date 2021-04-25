module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'province',
        {
            province_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            province_name:{
                type: DataTypes.STRING,
                field: 'province_name'
            }
        }
    );
}