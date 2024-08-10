const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const List = require('./lists');

const PlayersList = sequelize.define('PlayersList', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    lists_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    players_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    player_status: {
        type: DataTypes.CHAR(2),
        allowNull: false,
    },
}, {
    tableName: 'players_list',
    timestamps: true,
});

PlayersList.belongsTo(User, { foreignKey: 'players_id', as: 'player' });
PlayersList.belongsTo(List, { foreignKey: 'lists_id', as: 'list' });

module.exports = PlayersList;
