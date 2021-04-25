module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'enshrine',
        {
            e_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            n_id:{
                type: DataTypes.INTEGER,
                field: 'n_id'
            },
            u_userId:{
                type: DataTypes.STRING,
                field: 'u_userId'
            },
        }
    );
}