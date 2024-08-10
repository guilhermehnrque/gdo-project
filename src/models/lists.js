const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Schedules = require('./schedules');
const PlayersList = require('./playersList');
const Guest = require('./guests');

const List = sequelize.define('List', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    schedules_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'lists',
    timestamps: true,
});

List.belongsTo(Schedules, { foreignKey: 'schedules_id', as: 'schedule' });
List.hasMany(PlayersList, { foreignKey: 'lists_id', as: 'playersLists' });
List.hasMany(Guest, { foreignKey: 'lists_id', as: 'guests' });

module.exports = List;
