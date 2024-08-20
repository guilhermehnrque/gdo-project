const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Group = require('./group');

class Local extends Model {}

Local.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    zip_code: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    description: {
        type: DataTypes.STRING(255),
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
}, {
    sequelize,
    modelName: 'Local',
    tableName: 'locals',
    timestamps: false,
});

module.exports = Local;
