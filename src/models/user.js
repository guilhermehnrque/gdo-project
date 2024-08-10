const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Groups = require('./groups');
const PlayersList = require('./playersList');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    is_staff: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: true,
});

User.hasMany(Groups, { foreignKey: 'users_id', as: 'groups' });
User.hasMany(PlayersList, { foreignKey: 'players_id', as: 'playersLists' });

module.exports = User;
