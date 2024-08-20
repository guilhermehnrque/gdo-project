const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

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
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    tableName: 'groups',
    timestamps: false, 
});

Group.belongsTo(User, { foreignKey: 'users_id', as: 'user' });

module.exports = Group;
