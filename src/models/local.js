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
    city: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    district: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    cep: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: true, // Permite que seja nulo
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
    timestamps: true,
});

module.exports = Local;
