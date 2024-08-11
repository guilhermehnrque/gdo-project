const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const List = require('./list');

class PlayersList extends Model {}

PlayersList.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    lists_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: List,
            key: 'id',
        },
    },
    players_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    player_status: {
        type: DataTypes.CHAR(2),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'PlayersList',
    tableName: 'players_list',
    timestamps: true,
});

module.exports = PlayersList;
