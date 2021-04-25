var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'trend',
        {
            t_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            t_content:{
                type: DataTypes.STRING,
                field: 't_content'
            },
            t_media:{
                type: DataTypes.STRING,
                field: 't_media'
            },
            t_type: {
                type: DataTypes.INTEGER,
                field: 't_type'
            },
            t_like:{
                type: DataTypes.INTEGER,
                field: 't_like'
            },
            t_date: {
                type: DataTypes.DATE,
                field: 't_date',
                get() {
                    return moment(this.getDataValue('t_date')).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            u_userId:{
                type: DataTypes.STRING,
                field: 'u_userId'
            },
        }
    );
}