const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const List = require('./list');

class Guest extends Model {}

Guest.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    lists_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: List,
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Guest',
    tableName: 'guests',
    timestamps: true,
});


module.exports = Guest;
