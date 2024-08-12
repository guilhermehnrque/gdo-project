const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
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
    phone_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
}, {
    sequelize, 
    modelName: 'User', 
    tableName: 'users', 
    timestamps: false, 
});

module.exports = User;
