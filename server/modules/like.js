module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'like',
        {
            l_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            t_id:{
                type: DataTypes.INTEGER,
                field: 't_id'
            },
            u_userId:{
                type: DataTypes.STRING,
                field: 'u_userId'
            },
        }
    );
}