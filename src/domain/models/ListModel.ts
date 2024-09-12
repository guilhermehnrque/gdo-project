import { DataTypes, Model } from 'sequelize';
import sequelize from '../../infrastructure/database/index';
import { Schedule } from './ScheduleModel';
import { ListAttributes } from '../interfaces/attributes/ListAttributes';
import { Group } from './GroupModel';

type ListCreationAttributes = Omit<ListAttributes, 'id' | 'created_at' | 'updated_at'>;

class List extends Model<ListAttributes, ListCreationAttributes> implements ListAttributes {
    public id!: number;
    public description!: string | null;
    public status!: boolean;
    public schedules_id!: number;
    public groups_id!: number;
    public limit!: number;
    public created_at!: Date;
    public updated_at!: Date;

    public readonly createdAd!: Date;
    public readonly updatedAt!: Date;
    public readonly schedule!: Schedule;
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
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    schedules_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Schedule,
            key: 'id',
        }
    },
    groups_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Group,
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
    }
}, {
    tableName: 'lists',
    sequelize,
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

List.belongsTo(Schedule, { foreignKey: 'schedules_id', as: 'schedule' });
List.belongsTo(Group, { foreignKey: 'groups_id', as: 'group' });

export { List };
