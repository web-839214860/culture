module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'convention',
        {
            c_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            c_name:{
                type: DataTypes.STRING,
                field: 'c_name'
            },
            c_company:{
                type: DataTypes.STRING,
                field: 'c_company'
            },
            c_synopsis:{
                type: DataTypes.TEXT,
                field: 'c_synopsis'
            },
            publish_id:{
                type: DataTypes.INTEGER,
                field: 'publish_id'
            },
            type_id:{
                type: DataTypes.INTEGER,
                field: 'type_id'
            },
            province_id:{
                type: DataTypes.INTEGER,
                field: 'province_id'
            }
        }
    );
}