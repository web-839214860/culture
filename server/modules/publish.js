module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'publish',
        {
            publish_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            publish_date:{
                type: DataTypes.STRING,
                field: 'publish_date'
            }
        }
    );
}