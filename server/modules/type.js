module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'type',
        {
            type_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type_name:{
                type: DataTypes.STRING,
                field: 'type_name'
            }
        }
    );
}