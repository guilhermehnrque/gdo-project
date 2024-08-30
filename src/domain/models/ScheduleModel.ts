import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../infrastructure/database/index';
import { Group } from './GroupModel';

interface ScheduleAttributes {
    id: number;
    day_of_week: string;
    active: boolean;
    start: string;
    finish: string;
    created_at: Date;
    groups_id: number;
    scheduling: boolean;
    execute_before_days?: number | null;
    execute_in_hour?: string | null;
    updated_at?: Date | null;
}

type ScheduleCreationAttributes = Optional<ScheduleAttributes, 'id' | 'created_at' | 'updated_at'>;

class Schedule extends Model<ScheduleAttributes, ScheduleCreationAttributes> implements ScheduleAttributes {
    public id!: number;
    public day_of_week!: string;
    public active!: boolean;
    public start!: string;
    public finish!: string;
    public created_at!: Date;
    public groups_id!: number;
    public scheduling!: boolean;
    public execute_before_days?: number | null;
    public execute_in_hour?: string | null;
    public updated_at?: Date | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
}

Schedule.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    day_of_week: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    start: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    finish: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
        defaultValue: null,
    },
    groups_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Group,
            key: 'id',
        },
    },
    scheduling: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    execute_before_days: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    execute_in_hour: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
}, {
    sequelize,
    tableName: 'schedules',
    modelName: 'Schedule',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export { Schedule };
