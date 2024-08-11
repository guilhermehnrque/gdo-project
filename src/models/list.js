const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Schedules = require('./schedule');
const PlayersList = require('./playersList');
const Guest = require('./guest');

class List extends Model {}

List.init({
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
        references: {
            model: Schedules,
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'List',
    tableName: 'lists',
    timestamps: true,
});

module.exports = List;
