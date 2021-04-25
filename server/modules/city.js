module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'city',
        {
            city_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            city_name:{
                type: DataTypes.STRING,
                field: 'city_name'
            },
            province_id:{
                type: DataTypes.INTEGER,
                field: 'province_id'
            }
        }
    );
}