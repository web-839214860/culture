var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'news',
        {
            n_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            n_source:{
                type: DataTypes.STRING,
                field: 'n_source'
            },
            n_author:{
                type: DataTypes.STRING,
                field: 'n_author'
            },
            n_date: {
                type: DataTypes.DATE,
                field: 'n_date',
                get() {
                    return moment(this.getDataValue('n_date')).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            n_title:{
                type: DataTypes.STRING,
                field: 'n_title'
            },
            n_article:{
                type: DataTypes.TEXT,
                field: 'n_article'
            },
            n_image:{
                type: DataTypes.STRING,
                field: 'n_image'
            },
            n_enshrine:{
                type: DataTypes.INTEGER,
                field: 'n_enshrine'
            },
            n_view:{
                type: DataTypes.INTEGER,
                field: 'n_view'
            },
            sort_id:{
                type: DataTypes.INTEGER,
                field: 'sort_id'
            }
        }
    );
}