import { Model, DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/database/index';

class Guest extends Model {
    public id!: number;
    public name!: string;
    public lists_id!: number;
    public created_at!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Guest.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    lists_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
    },
}, {
    sequelize,
    tableName: 'guests',
    modelName: 'Guest',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export { Guest };