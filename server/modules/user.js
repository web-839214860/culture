var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'user',
        {
            u_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            u_userId:{
                type: DataTypes.STRING,
                field: 'u_userId'
            },
            u_password:{
                type: DataTypes.STRING,
                field: 'u_password'
            },
            u_name:{
                type: DataTypes.STRING,
                field: 'u_name'
            },
            u_sex:{
                type: DataTypes.STRING,
                field: 'u_sex'
            },
            u_sign:{
                type: DataTypes.STRING,
                field: 'u_sign'
            },
            u_image:{
                type: DataTypes.STRING,
                field: 'u_image'
            },
            u_date: {
                type: DataTypes.DATEONLY,
                field: 'u_date',
                get() {
                    return moment(this.getDataValue('u_date')).format('YYYY-MM-DD');
                }
            },
            u_star:{
                type: DataTypes.INTEGER,
                field: 'u_star'
            },
            role:{
                type: DataTypes.INTEGER,
                field: 'role'
            },
            solt:{
                type: DataTypes.STRING,
                field: 'solt'
            }, 
            province_id:{
                type: DataTypes.INTEGER,
                field: 'province_id'
            },
            city_id:{
                type: DataTypes.INTEGER,
                field: 'city_id'
            }
        }
    );
}