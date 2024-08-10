const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Group = require('./group');
const User = require('./user');

const GroupsUsers = sequelize.define('GroupsUsers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    groups_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'groups_users',
    timestamps: false,
});

GroupsUsers.belongsTo(Group, { foreignKey: 'groups_id', as: 'group' });
GroupsUsers.belongsTo(User, { foreignKey: 'users_id', as: 'user' });

module.exports = GroupsUsers;
