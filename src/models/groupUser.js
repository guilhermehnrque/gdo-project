const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Group = require('./group');
const User = require('./user');

class GroupsUsers extends Model {}

GroupsUsers.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    groups_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Group,
            key: 'id',
        },
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'GroupsUsers',
    tableName: 'groups_users',
    timestamps: false,
});

module.exports = GroupsUsers;
