import { Model, DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/database/index';
import { List } from './ListModel';
import { GuestAttributes } from '../interfaces/attributes/GuestAttributes';

type GuestCreationAttributes = Omit<GuestAttributes, 'id' | 'created_at'>;

class Guest extends Model<GuestAttributes, GuestCreationAttributes> implements GuestAttributes {
    public id!: number;
    public name!: string;
    public lists_id!: number;
    public created_at!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly list?: List;
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
        references: {
            model: 'lists',
            key: 'id',
        },
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

Guest.belongsTo(List, { foreignKey: 'lists_id', as: 'list' });

export { Guest };