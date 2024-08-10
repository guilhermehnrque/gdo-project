const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Groups = require('./groups');
const List = require('./lists');

const Schedule = sequelize.define('Schedule', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    active: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    groups_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    start: {
        type: DataTypes.TIMESTAMP,
        allowNull: false,
    },
    finish: {
        type: DataTypes.TIMESTAMP,
        allowNull: false,
    },
}, {
    tableName: 'schedules',
    timestamps: true,
});

Schedule.belongsTo(Groups, { foreignKey: 'groups_id', as: 'group' });
Schedule.hasMany(List, { foreignKey: 'schedules_id', as: 'lists' });

module.exports = Schedule;
