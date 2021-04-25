module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'sort',
        {
            sort_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            sort_name:{
                type: DataTypes.STRING,
                field: 'sort_name'
            }
        }
    );
}