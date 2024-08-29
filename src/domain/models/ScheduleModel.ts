import { Model, DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/database/index';
import { Group } from './GroupModel';

interface ScheduleAttributes {
    id: number;
    date: Date;
    active: boolean;
    start: string;
    finish: string;
    created_at: Date;
    updated_at: Date | null;
    groups_id: number;
}

interface ScheduleCreationAttributes extends Omit<Schedule, 'id' | 'created_at' | 'updated_at'> { }

class Schedule extends Model<ScheduleAttributes, ScheduleCreationAttributes> implements ScheduleAttributes {
    public id!: number;
    public date!: Date;
    public active!: boolean;
    public start!: string;
    public finish!: string;
    public created_at!: Date;
    public updated_at!: Date | null;
    public groups_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
}

Schedule.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
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
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
    },
    groups_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Group,
            key: 'id',
        }
    },
}, {
    sequelize,
    tableName: 'schedules',
    modelName: 'Schedule',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export { Schedule };