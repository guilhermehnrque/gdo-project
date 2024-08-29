import { DataTypes, Model } from 'sequelize';
import sequelize from '../../infrastructure/database/index';

interface ListAttributes {
    id: number;
    description: string | null;
    status: number;
    schedules_id: number;
    created_at: Date;
    updated_at: Date;
    scheduled_data: Date | null;
}

type ListCreationAttributes = Omit<ListAttributes, 'id' | 'created_at' | 'updated_at'>;

class List extends Model<ListAttributes, ListCreationAttributes> implements ListAttributes {
    public id!: number;
    public description!: string | null;
    public status!: number;
    public schedules_id!: number;
    public created_at!: Date;
    public updated_at!: Date;
    public scheduled_data!: Date | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

List.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    schedules_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Schedule',
            key: 'id',
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
    },
    scheduled_data: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'lists',
    sequelize,
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export { List };