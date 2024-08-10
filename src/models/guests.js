const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const List = require('./lists');

const Guest = sequelize.define('Guest', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    lists_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'guests',
    timestamps: true,
});


Guest.belongsTo(List, { foreignKey: 'lists_id', as: 'list' });

module.exports = Guest;
