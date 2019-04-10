var role          = require('../utils/constan/roleConstant');
var connection    = require('../utils/config/connectionDB');
var Sequelize     = require('sequelize');

var Articles = connection.sequelize.define('articles', {
    id: {
        type: 'INTEGER',
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    title: {
        type : 'STRING',
        allowNull: false
    },
    content: {
        type : 'STRING',
        allowNull : false
    },
    thumbnail: {
        type : 'STRING',
        allowNull : false
    },
    state : {
        type : 'INTEGER',
        allowNull : false
    },
    created_date: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false
    },
    updated_date: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false
    },
    created_by: {
        type: 'INTEGER',
        defaultValue : role.user,
        allowNull: false
    },
    updated_by: {
        type: 'INTEGER',
        defaultValue: role.user,
        allowNull: false
    }
});

module.exports =  Articles;