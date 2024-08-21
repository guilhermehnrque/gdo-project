const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Local = require('./local');

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
    is_active: {
        type: DataTypes.TINYINT,
        allowNull: false,
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
    tableName: 'groups',
    timestamps: false, 
});

Group.belongsTo(User, { foreignKey: 'users_id', as: 'user' })
Group.hasMany(Local, { foreignKey: 'groups_id', as: 'local' })

module.exports = Group;
