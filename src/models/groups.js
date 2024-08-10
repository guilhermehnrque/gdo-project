const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Schedule = require('./schedules');
const Local = require('./locals');
const GroupsUsers = require('./groupsUsers');

const Group = sequelize.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'groups',
    timestamps: true,
});

Group.belongsTo(User, { foreignKey: 'users_id', as: 'user' });
Group.hasMany(Schedule, { foreignKey: 'groups_id', as: 'schedules' });
Group.hasMany(Local, { foreignKey: 'groups_id', as: 'locals' });
Group.hasMany(GroupsUsers, { foreignKey: 'groups_id', as: 'groupsUsers' });

module.exports = Group;
